import { Slider as ChakraSlider, HStack, Text } from '@chakra-ui/react';
import * as React from 'react';

export interface SliderProps extends ChakraSlider.RootProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>;
  label?: React.ReactNode;
  showValue?: boolean;
}

export const RangeSlider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { label, showValue, marks, ...rest } = props;
    return (
      <center>
        <ChakraSlider.Root ref={ref} flex={0} thumbAlignment="center" {...rest}>
          {label && !showValue && (
            <ChakraSlider.Label>{label}</ChakraSlider.Label>
          )}
          {label && showValue && (
            <HStack justify="space-between">
              <ChakraSlider.Label>{label}</ChakraSlider.Label>
              <ChakraSlider.ValueText />
            </HStack>
          )}
          <ChakraSlider.Control>
            <ChakraSlider.Track>
              <ChakraSlider.Range />
            </ChakraSlider.Track>
            <ChakraSlider.Thumbs />
            <ChakraSlider.Marks marks={marks} />
          </ChakraSlider.Control>
        </ChakraSlider.Root>
      </center>
    );
  },
);
