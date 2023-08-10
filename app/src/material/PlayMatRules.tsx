/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next';
import { PlayMoveButton } from '@gamepark/react-game/dist/components/buttons/PlayMoveButton/PlayMoveButton';
import { linkButtonCss } from '@gamepark/react-game/dist/css/buttonCss';
import { displayLocationRules } from '@gamepark/rules-api/dist/material/moves/local/DisplayRules';
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType';

export const PlayMatRules = () => {
  const { t } = useTranslation();
  return <>
    <h2>{ t('rules.playmat.title') }</h2>
    <p>
      <Trans defaults="rules.playmat.purpose">
        <PlayMoveButton css={ linkButtonCss } move={ displayLocationRules({ type: LocationType.AstralPlane }) } local/>
        <PlayMoveButton css={ linkButtonCss } move={ displayLocationRules({ type: LocationType.Battlefield }) } local/>
        <PlayMoveButton css={ linkButtonCss } move={ displayLocationRules({ type: LocationType.PlayerDiscard }) } local/>
        <PlayMoveButton css={ linkButtonCss } move={ displayLocationRules({ type: LocationType.PlayerDeck }) } local/>
      </Trans>
    </p>
  </>;
};
