// theme.ts
// @ts-nocheck
import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineLayerStyles,
  defineRecipe,
} from '@chakra-ui/react';

const sizer = { sm: 0.9, lg: 1.125, xl: 1.25 };

export function makeFontSizes(root: string, size: number) {
  return Object.keys(sizer).reduce(
    (a, key) => {
      a[`${root}_${key}`] = `${sizer[key] * size}rem`;
      return a;
    },
    { [root]: `${size}rem` },
  );
}

export function responsive(root: string) {
  return Object.keys(sizer).reduce(
    (a, key) => {
      a[key] = `${root}_${key}`;
      return a;
    },
    { md: root },
  );
}

export function makeSpacing(root: string, size: number) {
  return Object.keys(sizer).reduce(
    (a, key) => {
      a[`${root}_${key}`] = { value: `${sizer[key] * size}rem` };
      return a;
    },
    { [root]: { value: `${size}rem` } },
  );
}

const CATEGORY_TILE = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 'xl',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  height: '100%',
  padding: 0,
  borderWidth: 2,
  boxSizing: 'border-box',
  borderColor: 'transparent',
};

const CATEGORY_TILE_IMAGE = {
  position: 'absolute',
  inset: 0,
  bgSize: 'cover',
  bgPosition: 'center',
};
const CASTEGORY_TEXT = {
  mt: 1,
  fontSize: 'xl',
  lineClamp: 1,
  fontFamily: 'Oswald',
  textAlign: 'center',
  color: 'theme.900',
};
const DISPLAY_FONT = 'Oswald, "Helvetica Narrow", sans-serif';
const BODY_FONT = '"IBM Plex Serif", Georgia, sans-serif';
const config = defineConfig({
  theme: {
    layerStyles: defineLayerStyles({
      adminFormRow: {
        value: {
          my: 4,
          maxWidth: '800px',
        },
      },
      adminIcon: {
        value: {
          position: 'absolute',
          right: '4',
          top: '4',
          width: '120px',
          height: '120px',
          p: '2',
          zIndex: 1000,
          color: 'white',
        },
      },
      adminPanel: {
        value: {
          bg: 'gray.50',
          display: 'flex',
          flex: '1 1 300px',
          maxWidth: '100rem',
          flexDirection: 'column',
          justifyContent: 'stretch',
          borderWidth: '1px',
          borderColor: 'gray.400',
          minHeight: '50vh',
        },
      },

      adminPanelBody: {
        value: {
          p: 4,
        },
      },
      adminPanelHeader: {
        value: {
          flex: 0,
          py: 2,
          bgGradient: 'to-b',
          gradientFrom: 'white',
          gradientTo: 'theme.900',
          justifyContent: 'center',
          display: 'flex',
          flexAlign: 'center',
        },
      },
      catBannerItem: {
        value: {
          px: { base: 1, xl: 2 },
          py: { base: 1, xl: 2 },
          borderColor: 'blackAlpha.200',
          borderWidth: 1,
          my: 2,
          mx: 4,
          rounded: 'full',
        },
      },
      catGridContainer: {
        px: '20px',
      },
      categoryTile: {
        value: CATEGORY_TILE,
      },
      categoryTileChosen: {
        value: {
          ...CATEGORY_TILE,
          borderColor: 'interface.800',
        },
      },
      categoryTileContent: {
        value: {
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          px: 2,
          pt: { base: 2, md: 4, lg: 10, xl: 16 },
          pb: 2,
        },
      },
      categoryTileImage: {
        value: CATEGORY_TILE_IMAGE,
      },
      categoryTileImageChosen: {
        value: { ...CATEGORY_TILE_IMAGE, backdropFilter: 'blur(20px)' },
      },
      categoryTileOverlay: {
        value: {
          position: 'absolute',
          inset: 0,
          bgGradient: 'to-t',
          gradientFrom: 'blackAlpha.400',
          gradientTo: 'transparent',
          zIndex: 1,
        },
      },
      container: {
        value: {
          px: { base: 4, lg: 6, xl: 8 },
          mb: 12,
        },
      },
      floatingFooter: {
        value: {
          position: 'absolute',
          width: 'full',
          zIndex: 1000,
          bottom: 8,
        },
      },
      goBackIcon: {
        value: {
          position: 'absolute',
          left: 4,
          top: 4,
          width: '120px',
          height: '120px',
          p: 2,
          zIndex: 1000,
          color: 'interface.500',
        },
      },
      heroText: {
        value: {
          my: '4rem',
          py: '2rem',
        },
      },
      levelIcon: {
        value: {
          w: '25vw',
          h: '30vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        },
      },
      listFrame: {
        value: {
          borderWidth: '1px',
          borderColor: 'Gray.400',
          px: 4,
          py: 3,
          my: 6,
        },
      },
      listItem: {
        value: {
          py: 2,
          px: 3,
          _hover: {
            bg: 'interface.900',
          },
        },
      },
      page: {
        value: {
          py: { sm: 2, md: 3, lg: 4, xl: 5 },
          overflowY: 'auto',
          height: '100%',
        },
      },
      pageContainer: {
        value: {
          height: '100%',
          bgGradient: 'to-b',
          gradientFrom: 'theme.900',
          gradientTo: 'theme.700',
        },
      },
      pageContainerAdmin: {
        value: {
          height: '100%',
          flex: 1,
          bgGradient: 'to-b',
          gradientFrom: 'gray.50',
          gradientTo: 'gray.200',
        },
      },
      pageContent: {
        value: {
          my: 'xl',
          px: {
            base: 'pageMargin_sm',
            m: 'pageMargin',
            l: 'pageMargin_l',
            xl: 'pageMargin_xl',
          },
        },
      },
      pageInner: {
        value: {
          w: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'stretch',
        },
      },
      panelContainer: {
        value: {
          mt: 8,
          mx: {
            base: 'pageMargin_sm',
            m: 'pageMargin',
            l: 'pageMargin_l',
            xl: 'pageMargin_xl',
          },
        },
      },
      prompt: {
        value: {
          my: responsive('promptMy'),
          mx: responsive('promptMx'),
          bgColor: 'prompt',
          px: responsive('promptPx'),
          py: responsive('promptPy'),
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
        },
      },
      questionBanner: {
        value: {
          py: { base: 4, lg: 5, max: 6 },
          px: { base: 8, lg: 10, max: 13 },
        },
      },
      questionBannerAnswer: {
        value: {
          borderWidth: '1px',
          borderColor: 'white',
          px: { base: 8, lg: 12, max: 15 },
          py: { base: 6, lg: 8, max: 10 },
          bgGradient: 'to-b',
          bg: 'theme.900',
          gradientFrom: 'theme.900',
          gradientTo: 'theme.500',
          _hover: {
            bg: 'interface.900',
          },
        },
      },
      questionBannerQuestion: {
        value: {
          mb: 6,
        },
      },
      questionListDiff: {
        value: {
          position: 'absolute',
          bottom: 6,
          right: 4,
          width: '33%',
        },
      },
      questionListItem: {
        value: {
          borderWidth: 1,
          borderColor: 'blackAlpha.300',
          px: { base: 4, lg: 5, xl: 6 },
          py: { base: 2, lg: 3, xl: 4 },
          maxWidth: '800px',
          mb: 4,
          width: '100%',
          position: 'relative',
        },
      },
      startBanner: {
        value: {
          h: '100%',
          w: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'space-between',
          flexDirection: 'column',
        },
      },
    }),
    tokens: {
      fonts: {
        heading: { value: `'Bungee', serif` },
        body: { value: `'Oswald', sans-serif` },
      },
      fontSizes: {
        ...makeFontSizes('sm', 0.9),
        ...makeFontSizes('md', 1),
        ...makeFontSizes('lg', 1.2),
        ...makeFontSizes('xl', 1.6),
        ...makeFontSizes('xxl', 1.9),
        disp: {
          xl_sm: {
            value: '2.5rem',
          },
          xl: {
            value: '3rem',
          },
          xl_lg: { value: '4rem' },
          xl_xl: { value: '5rem' },

          m_sm: { value: '1.25rem' },
          m: { value: '1.5rem' },
          m_lg: { value: '2rem' },
          m_xl: { value: '2.25rem' },

          l: { value: '2rem' },
          l_sm: { value: '1.755rem' },
          l_lg: { value: '2.5rem' },
          l_xl: { value: '2.8rem' },
        },
        dispText: {
          m: { value: '1.25rem' },
          m_lg: { value: '1.5rem' },
          m_xl: { value: '1.66rem' },
        },
      },
      colors: {
        wrongResult: {
          value: '#FFCCCC',
        },
        correctResult: {
          value: '#CCFFCC',
        },
        stupidResult: {
          value: '#a30000',
        },
        interface: {
          50: {
            value: 'hsl(36,100%,5%)',
          },
          100: {
            value: 'hsl(36,100%,10%)',
          },
          200: {
            value: 'hsl(36,100%,20%)',
          },
          300: {
            value: 'hsl(36,100%,30%)',
          },
          500: {
            value: 'hsl(36,100%,50%)',
          },
          600: {
            value: 'hsl(36,100%,60%)',
          },
          700: {
            value: 'hsl(36,100%,70%)',
          },
          800: {
            value: 'hsl(36,100%,80%)',
          },
          900: {
            value: 'hsl(36,100%,90%)',
          },
          1000: {
            value: 'hsl(36,100%,95%)',
          },
        },
        categoryButton: {
          unselected: '{colors.theme.400}',
          selected: '{colors.theme.700}',
        },
        button: {
          a: { value: '{colors.gray.100}' },
          b: { value: '{colors.gray.200}' },
          hover: { value: 'colors.interface.600' },
        },
        textAccent: { value: 'hsl(73,100%,50%)' },
        theme: {
          50: { value: 'hsl(256, 70%, 5%)' },
          100: { value: 'hsl(256, 70%, 10%)' },
          200: { value: 'hsl(256, 70%, 20%)' },
          300: { value: 'hsl(256, 70%, 30%)' },
          400: { value: 'hsl(256, 70%, 40%)' },
          500: { value: 'hsl(256, 70%, 50%)' },
          600: { value: 'hsl(256, 70%, 60%)' },
          700: { value: 'hsl(256, 70%, 70%)' },
          800: { value: 'hsl(256, 70%, 80%)' },
          900: { value: 'hsl(256, 70%, 90%)' },
          1000: { value: 'hsl(256, 70%, 95%)' },
        },
        themeImpact: {
          50: { value: 'hsl(240, 90%, 5%)' },
          100: { value: 'hsl(240, 90%, 10%)' },
          200: { value: 'hsl(240, 90%, 20%)' },
          300: { value: 'hsl(240, 90%, 30%)' },
          400: { value: 'hsl(240, 90%, 40%)' },
          500: { value: 'hsl(240, 70%, 50%)' },
          600: { value: 'hsl(240, 90%, 60%)' },
          700: { value: 'hsl(240, 90%, 70%)' },
          800: { value: 'hsl(240, 90%, 80%)' },
          900: { value: 'hsl(240, 90%, 90%)' },
          1000: { value: 'hsl(240, 90%, 100%)' },
        },
        themeAlpha: {
          50: { value: 'hsla(256, 70%,  50%, 5%,)' },
          100: { value: 'hsla(256, 70%, 50%, 10%,)' },
          200: { value: 'hsla(256, 70%, 50%,  20%,)' },
          300: { value: 'hsla(256, 70%,  50%, 30%)' },
          400: { value: 'hsla(256, 70%,  50%, 40%)' },
          500: { value: 'hsla(256, 70%, 50%, 50%)' },
          600: { value: 'hsla(256, 70%,  50%, 60%)' },
          700: { value: 'hsla(256, 70%, 50%, 70%)' },
          800: { value: 'hsla(256, 70%, 50%, 80%)' },
          900: { value: 'hsla(256, 70%, 50%, 90%)' },
          1000: { value: 'hsla(256, 70%, 50%, 100%)' },
        },
        prompt: 'transparent',
      },
      lineHeights: {
        compact: { value: '90%' },
        normal: { value: 'normal' },
        relaxed: { value: '140%' },
      },
      spacing: {
        ...makeSpacing('pageMargin', 6),
        ...makeSpacing('promptPx', 0.25),
        ...makeSpacing('promptPy', 0.5),
        ...makeSpacing('promptMx', 3),
        ...makeSpacing('promptMy', 0.5),
        ...makeSpacing('buttonPy', 0.2),
      },
    },

    textStyles: {
      reportText: {
        value: {
          fontFamily: DISPLAY_FONT,
          fontSize: responsive('lg'),
          fontWeight: 400,
          px: { base: 2, lg: 3, xl: 4 },
          py: { base: 2, xl: 3 },
          lineHeight: 'relaxed',
        },
      },
      questBannerQuestion: {
        value: {
          fontSize: responsive('xxl'),
          fontFamily: BODY_FONT,
          fontWeight: 600,
          lineHeight: 'compact',
        },
      },
      questionBannerAnswer: {
        value: {
          fontSize: responsive('xl'),
          fontFamily: BODY_FONT,
          fontWeight: 600,
          lineHeight: 'compact',
        },
      },

      resultText: {
        fontFamily: 'Oswald',
      },
      questionListId: {
        value: {
          fontFamily: BODY_FONT,
          fontSize: responsive('sm'),
          color: 'blackAlpha.600',
        },
      },
      questionListDiff: {
        value: {
          fontFamily: '"IBM Plex Serif", Georgia, sans-serif',
          fontSize: 'xs',
          color: 'black',
          textAlign: 'right',
        },
      },
      questionListQuestion: {
        value: {
          fontFamily: '"IBM Plex Serif", Georgia, sans-serif',
          fontSize: responsive('lg'),
          color: 'black',
        },
      },
      adminFormLabel: {
        value: {
          fontFamily: '"IBM Plex Serif", Georgia, sans-serif',
          fontSize: responsive('md'),
          color: 'blackAlpha.800',
        },
      },
      adminListItem: {
        value: {
          fontSize: responsive('md'),
          fontWeight: 500,
          fontFamily: '"IBM Plex Serif", Georgia, sans-serif',
        },
      },
      prompt: {
        value: {
          fontSize: responsive('lg'),
          fontWeight: 500,
          fontFamily: 'Oswald, "Helvetica Narrow", sans-serif',
        },
      },
      promptMinor: {
        value: {
          fontSize: responsive('md'),
          fontWeight: 300,
          fontFamily: 'Oswald, "Helvetica Narrow", sans-serif',
        },
      },
      catBannerItem: {
        value: {
          fontSize: responsive('sm'),
          fontWeight: 500,
          fontFamily: 'Oswald, "Helvetica Narrow", sans-serif',
        },
      },
      categoryButton: {
        value: CASTEGORY_TEXT,
      },
      categoryButtonSelected: {
        value: { ...CASTEGORY_TEXT, color: 'yellow' },
      },
      iconicText: {
        value: {
          fontSize: { base: 'md', lg: 'md_l', xl: 'md_xl' },
          color: 'white',
        },
      },
      adminPanelTitle: {
        value: {
          fontFamily: 'Oswald',
          fontSize: {
            base: 'md_sm',
            md: 'md',
            lg: 'md_lg',
            xl: 'md_xl',
          },
        },
      },
      displayHead: {
        value: {
          textAlign: 'center',
          color: 'black',
          fontSize: {
            base: 'disp.xl',
            sm: 'disp.xl_sm',
            lg: 'disp.xl_lg',
            xl: 'disp.xl_xl',
          },
          fontFamily: 'Bungee',
          textTransform: 'uppercase',
          lineHeight: 'compact',
        },
      },
      displayHeadSub: {
        value: {
          textAlign: 'center',
          color: 'black',
          fontSize: {
            base: 'disp.lg',
            sm: 'disp.lg_sm',
            lg: 'disp.lg_lg',
            xl: 'disp.lg_xl',
          },
          fontFamily: 'Bungee',
          lineHeight: 'normal',
          textTransform: 'uppercase',
        },
      },
      display: {
        value: {
          textAlign: 'center',
          fontSize: { base: 'disp.m', lg: 'disp.m_lg', xl: 'disp.m_xl' },
          fontWeight: 500,
        },
      },
      buttonDisplay: {
        value: {
          fontSize: {
            base: 'dispText.m',
            lg: 'dispText.m_lg',
            xl: 'dispText.m_xl',
          },
          fontWeight: 'bold',
          lineHeight: 'relaxed',
          color: 'textAccent',
        },
      },
    },
    recipes: {
      button: defineRecipe({
        base: {
          flex: '0 0 auto',
          h: 'auto',
          bg: 'blue',
          rounded: 'full',
          _hover: {
            bg: undefined,
          },
          transition: 'none',
          textTransform: 'uppercase',
          lineHeight: 'relaxed',
          fontSize: responsive('lg'),
          fontWeight: 400,
        },
        variants: {
          normal: {
            true: {
              h: 'auto',
              px: 6,
              py: 2,
              flex: '0 0 auto',
              minWidth: '10rem',
              bgColor: 'theme.700',
              lineHeight: 'relaxed',
              textTransform: 'uppercase',
              _hover: {
                bg: 'theme.800',
              },
            },
          },
          admin: {
            true: {
              h: 'auto',
              bgGradient: 'to-b',
              gradientFrom: 'button.a',
              gradientTo: 'button.b',
              color: 'black',
              fontSize: responsive('md'),
              lineHeight: 'relaxed',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              rounded: 'md',
              mx: 'lg',
              px: 5,
              flex: '0 0 auto',
              py: 3,
              _hover: {
                bg: 'button.hover',
              },
              transition: 'none',
            },
          },
          display: {
            true: {
              rounded: 'full',
              cursor: 'pointer',
              bg: 'theme.400',
              paddingX: '6',
              paddingY: '3',
              mx: '2',
              my: '2',
              lineHeight: 'relaxed',
              color: 'textAccent',
              fontSize: responsive('lg'),
              fontWeight: 600,
              _hover: {
                bg: 'theme.500',
              },
              _active: {
                transform: 'translateY(2px)',
                transition: 'all 0.1s ease-in-out',
              },
              _pressed: {
                transform: 'translateY(2px)',
              },
              transition: 'none',
              _disabled: {
                bg: 'gray.400',
                color: 'gray.700!important',
                opacity: 1,
                _hover: {
                  bg: 'gray.400',
                  color: 'gray.700!important',
                },
              },
            },
          },
        },
        defaultVariants: {
          variant: 'solid',
          size: 'md',
        },
      }),
    },
  },
  globalCss: {
    body: {
      backgroundSize: 'cover',
      backgroundPosition: 'top left',
      fontFamily: 'body',
    },
    h1: {
      fontFamily: 'heading',
      lineHeight: 'relaxed',
    },
    'h2, h3, h4, h5, h6': {
      fontFamily: 'body',
      fontWeight: 'bold',
      lineHeight: 'relaxed',
    },
  },
});

console.log('config', config);
export const system = createSystem(defaultConfig, config);
