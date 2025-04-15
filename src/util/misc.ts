import { Restriction } from "@/types";

export const allFeaturesComplete = (features: any[]) => {
  const allFeaturesComplete = features.every((feature: any) =>
    feature.parts.some((part: any) => part.selected)
  );
  return allFeaturesComplete;
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
): Set<string> => {
  const partsToDisable = new Set<string>();

  selectedParts.forEach((selectedPart: any) => {
    const incompatibilitiesAsSource = allRestrictions.filter(
      (restriction) => restriction.id_part === selectedPart.id
    );

    const incompatibilitiesAsTarget = allRestrictions.filter(
      (restriction) => restriction.id_part_incompatible === selectedPart.id
    );

    incompatibilitiesAsSource.forEach((incompatibility) => {
      partsToDisable.add(incompatibility.id_part_incompatible);
    });

    incompatibilitiesAsTarget.forEach((incompatibility) => {
      partsToDisable.add(incompatibility.id_part);
    });
  });

  return partsToDisable;
};

export const findAllSelectedParts = (categories: any) => {
  const allSelectedParts = categories.flatMap((category: any) =>
    category.parts.filter((part: any) => part.selected)
  );
  return allSelectedParts;
};

export const findPriceRecord = (part: any, selectedParts: any[]): any => {
  const createDefaultPriceRecord = (part: any) => ({
    price: part.price || 0,
    base_price: part.base_price || 0,
    id_related_part: null,
  });

  if (
    !part.pricing ||
    !Array.isArray(part.pricing) ||
    part.pricing.length === 0
  ) {
    return createDefaultPriceRecord(part);
  }

  const relatedPartPricing = part.pricing.filter((priceRecord: any) => {
    if (priceRecord.id_related_part) {
      const relatedPartSelected = selectedParts.some(
        (selectedPart: any) => selectedPart.id === priceRecord.id_related_part
      );

      return relatedPartSelected;
    }
    return false;
  });

  if (relatedPartPricing.length > 0) {
    return relatedPartPricing[0];
  }

  return createDefaultPriceRecord(part);
};

export const handlePartSelection = (
  part: any,
  feature: any,
  categoriesOrFeatures: any[]
) => {
  return categoriesOrFeatures.map((item: any) => {
    if (item.id === feature.id) {
      return {
        ...item,
        parts: item.parts.map((_part: any) => ({
          ..._part,
          selected: _part.id === part.id,
        })),
      };
    }
    return item;
  });
};

export const calculatePricesAndDisabledStates = (
  categoriesOrFeatures: any[]
) => {
  const allSelectedParts = findAllSelectedParts(categoriesOrFeatures);
  const allRestrictions = collectAllRestrictions(categoriesOrFeatures);
  const partsToDisable = findPartsToDisable(allSelectedParts, allRestrictions);

  let totalPrice = 0;

  const updatedItems = categoriesOrFeatures.map((item: any) => {
    return {
      ...item,
      parts: item.parts.map((part: any) => {
        const isDisabled = partsToDisable.has(part.id);
        const selectedPriceRecord = findPriceRecord(part, allSelectedParts);

        if (part.selected && selectedPriceRecord && !isDisabled) {
          totalPrice += selectedPriceRecord.price;
        }

        return {
          ...part,
          disabled: isDisabled,
          priceValue: selectedPriceRecord.price,
          currentPriceRecord: selectedPriceRecord,
        };
      }),
    };
  });

  return {
    updatedItems,
    totalPrice,
    isfulfilled: allFeaturesComplete(updatedItems),
  };
};
