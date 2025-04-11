"use client";

import Image from "next/image";
import "./page.scss";
import { useCallback, useEffect, useState } from "react";

import cn from "classnames";
const block = "builder-page";

export type Restriction = {
  id_part: string;
  id_part_incompatible: string;
  details: string | null;
};

// export type Part = {
//   id: string;
//   label: string;
//   selected: boolean;
//   restrictions?: Restriction[];
// };

// export type Feature = {
//   id: string;
//   label: string;
//   parts: Part[];
// };

// export type Builder = {
//   label: string;
//   features: Feature[];
//   image?: string;
// };

export default function BuilderPage() {
  enum State {
    Default = "default",
  }
  const [state, setState] = useState<State>(State.Default);
  const [builder, setBuilder] = useState<any>();
  const [price, setPrice] = useState(0);
  const [shouldCalculatePrices, setShouldCalculatePrices] = useState(false);

  // Helper function to collect all restrictions from the builder
  const collectAllRestrictions = (builder: any): Restriction[] => {
    const allRestrictions: Restriction[] = [];

    builder.features.forEach((feature: any) => {
      feature.parts.forEach((part: any) => {
        if (part.restrictions && Array.isArray(part.restrictions)) {
          allRestrictions.push(...part.restrictions);
        }
      });
    });

    return allRestrictions;
  };

  // Helper function to find parts that should be disabled based on selected parts
  const findPartsToDisable = (
    selectedParts: any[],
    allRestrictions: Restriction[]
  ): Set<string> => {
    const partsToDisable = new Set<string>();

    selectedParts.forEach((selectedPart: any) => {
      // Find restrictions where this part makes other parts incompatible
      const incompatibilitiesAsSource = allRestrictions.filter(
        (restriction) => restriction.id_part === selectedPart.id
      );

      // Find restrictions where other parts make this part incompatible
      const incompatibilitiesAsTarget = allRestrictions.filter(
        (restriction) => restriction.id_part_incompatible === selectedPart.id
      );

      // Mark incompatible parts as disabled
      incompatibilitiesAsSource.forEach((incompatibility) => {
        partsToDisable.add(incompatibility.id_part_incompatible);
      });

      incompatibilitiesAsTarget.forEach((incompatibility) => {
        partsToDisable.add(incompatibility.id_part);
      });
    });

    return partsToDisable;
  };

  // Helper function to find price record for a part
  const findPriceRecord = (part: any, selectedParts: any[]): any => {
    // Helper function to create a default price record from a part
    const createDefaultPriceRecord = (part: any) => ({
      price: part.price || 0,
      base_price: part.base_price || 0,
      id_related_part: null,
    });

    // If no pricing array, use the default price record
    if (
      !part.pricing ||
      !Array.isArray(part.pricing) ||
      part.pricing.length === 0
    ) {
      return createDefaultPriceRecord(part);
    }

    // Look for pricing records with related_part
    const relatedPartPricing = part.pricing.filter((priceRecord: any) => {
      if (priceRecord.id_related_part) {
        // Check if the related part is selected
        const relatedPartSelected = selectedParts.some(
          (selectedPart: any) => selectedPart.id === priceRecord.id_related_part
        );

        return relatedPartSelected;
      }
      return false;
    });

    // If we found related pricing, use the first one
    if (relatedPartPricing.length > 0) {
      return relatedPartPricing[0];
    }

    // Fallback to the default price record
    return createDefaultPriceRecord(part);
  };

  useEffect(() => {
    const fetchBuilder = async () => {
      const response = await fetch("/api/builder");
      const builder = await response.json();
      setBuilder(builder[0]);
      setShouldCalculatePrices(true);
    };
    fetchBuilder();
  }, []);

  const handlePartSelection = (part: any, feature: any) => {
    setBuilder((prevBuilder: any) => {
      const updatedBuilder = {
        ...prevBuilder,
        features: prevBuilder.features.map((_feature: any) => {
          if (_feature.id === feature.id) {
            return {
              ..._feature,
              parts: _feature.parts.map((_part: any) => ({
                ..._part,
                selected: _part.id === part.id,
              })),
            };
          }
          return _feature;
        }),
      };

      return updatedBuilder;
    });

    setShouldCalculatePrices(true);
  };

  // Effect for calculating prices and restrictions
  useEffect(() => {
    if (!shouldCalculatePrices) return;

    setBuilder((prevBuilder: any) => {
      if (!prevBuilder) return prevBuilder;
      setPrice(0);

      // Find all selected parts across all features
      const allSelectedParts = prevBuilder.features.flatMap((feature: any) =>
        feature.parts.filter((part: any) => part.selected)
      );

      // Get all restrictions and calculate which parts should be disabled
      const allRestrictions = collectAllRestrictions(prevBuilder);
      const partsToDisable = findPartsToDisable(
        allSelectedParts,
        allRestrictions
      );

      const updatedBuilder = {
        ...prevBuilder,
        features: prevBuilder.features.map((feature: any) => ({
          ...feature,
          parts: feature.parts.map((part: any) => {
            // Apply disabled state based on restrictions
            const isDisabled = partsToDisable.has(part.id);

            // Find appropriate price record for this part
            const selectedPriceRecord = findPriceRecord(part, allSelectedParts);

            // Add to total price if part is selected
            if (part.selected && selectedPriceRecord && !isDisabled) {
              setPrice(
                (prevPrice: number) => prevPrice + selectedPriceRecord.price
              );
            }

            return {
              ...part,
              disabled: isDisabled,
              priceValue: selectedPriceRecord.price,
              currentPriceRecord: selectedPriceRecord,
            };
          }),
        })),
      };

      return updatedBuilder;
    });

    setShouldCalculatePrices(false);
  }, [shouldCalculatePrices]);

  return (
    <div className={block}>
      <div className={`${block}__toolbar`}>
        <div className={`${block}__toolbar-header`}>
          <div className={`${block}__toolbar-header-label`}>
            {builder?.label}-{price}
          </div>
        </div>
        <div className={`${block}__toolbar-body`}>
          {builder?.features.map((feature: any) => (
            <div className={`${block}__toolbar-feature`} key={feature.id}>
              <div className={`${block}__toolbar-feature-category`}>
                <div className={`${block}__toolbar-feature-category-label`}>
                  {feature.category.label}
                </div>
                <div className={`${block}__toolbar-feature-parts`}>
                  {feature.parts?.map((part: any) => (
                    <div
                      className={cn(`${block}__toolbar-feature-part`, {
                        [`${block}__toolbar-feature-part--disabled`]:
                          part.disabled,
                        [`${block}__toolbar-feature-part--selected`]:
                          part.selected,
                      })}
                      key={part.id}
                      onClick={() => handlePartSelection(part, feature)}
                    >
                      {part.label}-{part.priceValue || 0}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${block}__preview`}>a</div>
    </div>
  );
}
