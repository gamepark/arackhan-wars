/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload'
import { faListCheck } from '@fortawesome/free-solid-svg-icons/faListCheck'
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardId } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DeckValidator } from '@gamepark/arackhan-wars/rules/DeckValidator'
import { useSaveDeck } from '@gamepark/react-client'
import { DialogProps, RulesDialog, ThemeButton, usePlay, useRules } from '@gamepark/react-game'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual } from 'react-redux'
import { DeckbuildingRules } from './DeckbuildingRules'
import { DeckList } from './DeckList'

export const DeckbuildingHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const deck = rules?.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems<CardId>().map(item => item.id!.front) ?? []
  const validator = new DeckValidator(deck)
  return <>
    <DeckListButton/>
    {' '}
    <SaveButton/>
    {' '}
    <DeckName/>
    {' ~ '}
    {validator.isValid ? t('header.deck.valid') : t('header.deck.invalid')}
  </>
}

const SaveButton = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const cards = rules?.material(MaterialType.FactionCard)
    .location(LocationType.PlayerDeck).sort(item => item.location.x!)
    .getItems<CardId>().map(item => item.id!.front)
  const [saveDeck] = useSaveDeck()
  const [deck, setDeck] = useState(() => JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!).deck)
  const [open, setOpen] = useState(false)
  const play = usePlay()

  const save = useCallback((name: string) => {
    if (!name) {
      setOpen(true)
      return
    }
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    saveDeck({ variables: { id: storage.deck?.id, boardGame: 'arackhan-wars', name, cards } }).then(({ data: { saveDeck: deck } }) => {
      storage.deck = deck
      localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
      setDeck(deck)
    })
  }, [saveDeck, cards])

  const rename = useCallback((name: string) => {
    play(rules!.rename(name))
    save(name)
    setOpen(false)
  }, [rules])

  return <>
    <ThemeButton onClick={() => save(rules?.name)} disabled={deck?.name === rules?.name && shallowEqual(deck?.cards, cards)} title={t('deck.save')!}>
      <FontAwesomeIcon icon={faDownload}/>
    </ThemeButton>
    <NameDeckDialog open={open} submit={rename} cancel={() => setOpen(false)}/>
  </>
}

const DeckListButton = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  return <>
    <ThemeButton onClick={() => setOpen(true)} title={t('deck.list')!}><FontAwesomeIcon icon={faListCheck}/></ThemeButton>
    <RulesDialog open={open} close={() => setOpen(false)}>
      <div css={decksCss}>
        <h2>{t('deck.list')}</h2>
        <DeckList close={() => setOpen(false)}/>
      </div>
    </RulesDialog>
  </>
}

const decksCss = css`
  font-size: 3em;
  padding: 0 1em;
  overflow: auto;
  max-height: inherit;

  > h2 {
    margin-right: 1em;
  }
`

const DeckName = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  const [open, setOpen] = useState(false)
  const rename = useCallback((name: string) => {
    play(rules!.rename(name))
    setOpen(false)
  }, [rules, play])
  return <>
    <ThemeButton onClick={() => setOpen(true)} title={t('deck.rename')!}><FontAwesomeIcon icon={faPen}/></ThemeButton>
    {' ~ '}
    {rules?.name}
    <NameDeckDialog open={open} submit={rename} cancel={() => setOpen(false)}/>
  </>
}

type NameDeckDialogProps = {
  submit: (name: string) => void
  cancel: () => void
} & DialogProps

const NameDeckDialog = ({ submit, cancel, ...props }: NameDeckDialogProps) => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const [name, setName] = useState(rules?.name)
  useEffect(() => {
    setName(rules?.name)
  }, [rules?.name])
  return (
    <RulesDialog {...props} css={nameDialogCss}>
      <h2 css={css`margin: 0.5em 0;`}>{t('deck.name')}</h2>
      <input type="text" css={nameInput} onChange={event => setName(event.target.value)}/>
      <div css={nameDialogButtons}>
        <ThemeButton onClick={cancel}>{t('Cancel')}</ThemeButton>
        <ThemeButton onClick={() => submit(name)}>{t('Validate')}</ThemeButton>
      </div>
    </RulesDialog>
  )
}

const nameDialogCss = css`
  min-width: 25em;
  font-size: 3em;
  padding: 1em;
`

const nameInput = css`
  border-radius: 1em;
  width: 100%;
  padding: 0 0.5em
`

const nameDialogButtons = css`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
`
