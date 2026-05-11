import { css } from '@emotion/react'
import background from './images/background.jpg'

const ink = '#6B4135'
const inkDark = '#4A2A1F'
const parchmentLight = '#FFF8EC'
const parchmentMid = '#FBEFD4'
const parchmentDeep = '#EDD6A8'
const muted = '#A0826A'

export const theme = {
  root: {
    background: {
      image: background,
      overlay: 'rgba(0, 0, 0, 0.3)'
    }
  },
  dialog: {
    color: ink,
    backgroundColor: parchmentLight,
    container: css`
      background:
        radial-gradient(ellipse at top, rgba(255, 255, 255, 0.6), transparent 70%),
        linear-gradient(180deg, ${parchmentLight} 0%, ${parchmentMid} 100%);
      color: ${ink};
      border: 0.08em solid ${ink};
      border-radius: 0.8em;
      box-shadow:
        0 0 0 0.15em ${parchmentDeep},
        0 0 0 0.22em ${ink},
        0 1.2em 2.4em rgba(0, 0, 0, 0.55),
        inset 0 0 2em rgba(107, 65, 53, 0.08);

      h1, h2, h3, h4 {
        font-family: 'Cinzel', serif;
        color: ${inkDark};
        letter-spacing: 0.02em;
      }

      h2 {
        border-bottom: 0.04em solid ${parchmentDeep};
        padding-bottom: 0.25em;
        font-size: 1.3em;
      }

      a {
        color: ${inkDark};
        text-decoration: underline;
        text-underline-offset: 0.15em;

        &:hover {
          color: ${ink};
        }
      }

      hr {
        border: none;
        border-top: 0.04em solid ${parchmentDeep};
        margin: 0.6em 0;
      }
    `,
    closeIcon: css`
      color: ${ink};
      opacity: 0.8;
      transition: opacity 120ms ease, transform 120ms ease;

      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }
    `,
    buttons: css`
      font-family: 'Cinzel', serif;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: ${ink};
      background: linear-gradient(180deg, ${parchmentLight} 0%, ${parchmentDeep} 100%);
      border: 0.06em solid ${ink};
      border-radius: 0.5em;
      padding: 0.35em 1.2em;
      box-shadow:
        0 0.12em 0.25em rgba(74, 42, 31, 0.35),
        inset 0 0.06em 0 rgba(255, 255, 255, 0.8),
        inset 0 -0.12em 0.25em rgba(107, 65, 53, 0.18);
      text-shadow: 0 0.04em 0 rgba(255, 255, 255, 0.6);
      transition: filter 120ms ease, box-shadow 120ms ease, transform 80ms ease, background 120ms ease;

      &:hover:not(:disabled), &:focus-visible:not(:disabled) {
        background: linear-gradient(180deg, #FFFCF2 0%, #F2DDB0 100%);
        filter: brightness(1.04);
        box-shadow:
          0 0.18em 0.35em rgba(74, 42, 31, 0.45),
          inset 0 0.06em 0 rgba(255, 255, 255, 0.9),
          inset 0 -0.12em 0.25em rgba(107, 65, 53, 0.18);
      }

      &:active:not(:disabled) {
        background: linear-gradient(180deg, ${parchmentDeep} 0%, ${parchmentMid} 100%);
        transform: translateY(0.05em);
        box-shadow:
          0 0.04em 0.1em rgba(74, 42, 31, 0.3),
          inset 0 0.1em 0.25em rgba(107, 65, 53, 0.25);
      }

      &:disabled {
        background: linear-gradient(180deg, #F0E8D6 0%, #D9CCAE 100%);
        color: ${muted};
        border-color: ${muted};
        text-shadow: none;
        box-shadow:
          inset 0 0.06em 0 rgba(255, 255, 255, 0.45),
          inset 0 -0.06em 0.15em rgba(107, 65, 53, 0.1);
        opacity: 0.75;
      }
    `
  }
}
