"use client";

import Image from "next/image";
import "./page.scss";
import { useCallback, useEffect, useState } from "react";
import Prompt from "@/components/prompt";
import Working from "@/components/working";
import Preview from "@/components/preview";
import cn from "classnames";
const block = "builder-page";

export type Part = {
  id: string;
  label: string;
  selected: boolean;
};

export type Modifier = {
  id: string;
  label: string;
  selected: boolean;
};

export type Feature = {
  id: string;
  label: string;
  parts: Part[];
  modifiers: Modifier[];
};

export type Builder = {
  label: string;
  features: Feature[];
  image?: string;
};

export default function BuilderPage() {
  enum State {
    Default = "default",
  }
  const [state, setState] = useState<State>(State.Default);
  const [builder, setBuilder] = useState<any>();
  const [price, setPrice] = useState(0);
  const [shouldCalculatePrices, setShouldCalculatePrices] = useState(false);

  useEffect(() => {
    const fetchBuilder = async () => {
      const response = await fetch("/api/builder");
      const builder = await response.json();
      console.log("builder", builder);
      setBuilder(builder[0]);
      setShouldCalculatePrices(true);
    };
    fetchBuilder();
  }, []);

  const handlePartClick = (part: any, feature: any) => {
    let pricing = part.pricing;

    pricing = pricing.filter((p: any) => !p.id_related_part)[0];

    console.log("pricing", pricing);

    setBuilder((prevBuilder: any) => {
      const updatedBuilder = {
        ...prevBuilder,
        features: prevBuilder.features.map((_feature: any) => {
          if (_feature.id === feature.id) {
            //pricing:
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

    // Trigger price recalculation after part selection
    setShouldCalculatePrices(true);
  };

  // Effect for calculating prices
  useEffect(() => {
    if (!shouldCalculatePrices || !builder) return;

    setBuilder((prevBuilder: any) => {
      if (!prevBuilder) return prevBuilder;
      setPrice(0);

      // Find all selected parts across all features
      const allSelectedParts = prevBuilder.features.flatMap((feature: any) =>
        feature.parts.filter((part: any) => part.selected)
      );

      // First pass: Find all parts that should be disabled based on selected parts and negative price values
      const partsToDisable = new Set<string>();

      prevBuilder.features.forEach((feature: any) => {
        feature.parts.forEach((part: any) => {
          if (part.pricing) {
            part.pricing.forEach((priceRecord: any) => {
              if (priceRecord.id_related_part && priceRecord.price < 0) {
                // Check if the related part is selected
                const relatedPartSelected = allSelectedParts.some(
                  (selectedPart: any) =>
                    selectedPart.id === priceRecord.id_related_part
                );

                // If related part is selected and price is negative, this part should be disabled
                if (relatedPartSelected) {
                  partsToDisable.add(part.id);
                }
              }
            });
          }
        });
      });

      const updatedBuilder = {
        ...prevBuilder,
        features: prevBuilder.features.map((feature: any) => ({
          ...feature,
          parts: feature.parts.map((part: any) => {
            // Apply disabled state based on our calculation
            const isDisabled = partsToDisable.has(part.id);

            // Find appropriate price record for this part
            let selectedPriceRecord: any = null;

            // Check if there's a related part price record that applies
            if (part.pricing) {
              // First look for pricing records with related_part
              const relatedPartPricing = part.pricing.filter(
                (priceRecord: any) => {
                  if (priceRecord.id_related_part) {
                    // Check if the related part is selected
                    const relatedPartSelected = allSelectedParts.some(
                      (selectedPart: any) =>
                        selectedPart.id === priceRecord.id_related_part
                    );

                    return relatedPartSelected;
                  }
                  return false;
                }
              );

              // If we found related pricing, use the first one
              if (relatedPartPricing.length > 0) {
                selectedPriceRecord = relatedPartPricing[0];
              } else {
                // Fallback to pricing without related parts
                selectedPriceRecord = part.pricing.find(
                  (priceRecord: any) => !priceRecord.id_related_part
                );
              }

              // Add to total price if part is selected
              if (part.selected && selectedPriceRecord && !isDisabled) {
                setPrice(
                  (prevPrice: number) => prevPrice + selectedPriceRecord.price
                );
              }
            }

            return {
              ...part,
              disabled: isDisabled,
              price: selectedPriceRecord,
            };
          }),
        })),
      };

      console.log("updatedBuilder", updatedBuilder);
      return updatedBuilder;
    });

    // Reset the flag after calculation is done
    setShouldCalculatePrices(false);
  }, [shouldCalculatePrices, builder]);

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
                      onClick={() => handlePartClick(part, feature)}
                    >
                      {part.label}-{part?.price?.price}-
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
