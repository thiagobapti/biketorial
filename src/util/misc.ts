import { Part, Restriction } from "@/types";

export const formatAsDollar = (amount: number): string => {
  return amount % 1 === 0 ? `${amount}` : `${amount.toFixed(2)}`;
};

export const collectAllRestrictions = (categories: any): Restriction[] => {
  const allRestrictions: Restriction[] = [];

  categories.forEach((category: any) => {
    category.parts.forEach((part: any) => {
      if (part.restrictions && Array.isArray(part.restrictions)) {
        allRestrictions.push(...part.restrictions);
      }
    });
  });

  return allRestrictions;
};

export const findPartsToDisable = (
  selectedParts: any[],
  allRestrictions: Restriction[]
): string[] => {
  const partsToDisable: string[] = [];
  const selectedPartIds = selectedParts.map((part) => part.id);

  allRestrictions.forEach((restriction) => {
    if (selectedPartIds.includes(restriction.id_part)) {
      if (!partsToDisable.includes(restriction.id_part_incompatible)) {
        partsToDisable.push(restriction.id_part_incompatible);
      }
    }

    if (selectedPartIds.includes(restriction.id_part_incompatible)) {
      if (!partsToDisable.includes(restriction.id_part)) {
        partsToDisable.push(restriction.id_part);
      }
    }
  });

  return partsToDisable;
};

export const findPriceRecord = (
  part: any,
  selectedParts: any[],
  idBasePart?: string
): any => {
  if (idBasePart && part?.pricing) {
    const basepartMatches = part.pricing.filter(
      (pricingRecord: any) => pricingRecord.id_related_part === idBasePart
    );

    if (basepartMatches.length > 0) return basepartMatches;
  }

  const pricingRecords = part?.pricing?.filter((pricingRecord: any) => {
    if (pricingRecord.id_related_part) {
      const relatedPartSelected = selectedParts.some(
        (selectedPart: any) => selectedPart.id === pricingRecord.id_related_part
      );

      return relatedPartSelected;
    }
    return false;
  });

  return pricingRecords;
};

export const handlePartSelectionWithPriceCalculation = (
  part: any,
  feature: any,
  categories: any[],
  idBasePart?: string
) => {
  // Track all selected parts while updating the selection
  const allSelectedParts: Part[] = [];

  let updatedCategories = categories;

  if (feature && part) {
    updatedCategories = categories.map((item: any) => {
      if (item.id === feature.id) {
        return {
          ...item,
          parts: item.parts.map((_part: any) => {
            const isSelected = _part.id === part.id;
            if (isSelected) {
              allSelectedParts.push(_part);
            }
            return {
              ..._part,
              selected: isSelected,
            };
          }),
        };
      } else {
        // For other categories, keep the existing selection
        item.parts.forEach((_part: any) => {
          if (_part.selected) {
            allSelectedParts.push(_part);
          }
        });
        return item;
      }
    });
  }

  const allRestrictions = collectAllRestrictions(updatedCategories);
  const partsToDisable = findPartsToDisable(allSelectedParts, allRestrictions);

  let totalPrice = 0;

  const updatedItems = updatedCategories.map((item: any) => {
    return {
      ...item,
      parts: item.parts.map((_part: any) => {
        const isDisabled =
          partsToDisable.includes(_part.id) || _part.quantity_available === 0;
        const selectedPriceRecord = findPriceRecord(
          _part,
          allSelectedParts,
          idBasePart
        );

        if (_part.selected) {
          totalPrice += selectedPriceRecord?.[0]?.price || _part.price;
        }

        const { customPrice, currentPriceRecord, ...rest } = _part;
        const result = {
          ...rest,
          disabled: isDisabled,
        };

        if (selectedPriceRecord?.[0]) {
          result.customPrice = selectedPriceRecord[0].price;
          result.currentPriceRecord = selectedPriceRecord[0];
        }

        return result;
      }),
    };
  });

  return {
    updatedItems,
    totalPrice,
    isfulfilled: allSelectedParts.length === updatedCategories.length,
    allSelectedParts,
  };
};
