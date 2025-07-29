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
import { Deck, PLATFORM_URI, useDeleteDeck, useMe, useMyDecks, useSaveDeck } from '@gamepark/react-client'
import { DialogProps, RulesDialog, ThemeButton, usePlay, useRules } from '@gamepark/react-game'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual } from 'react-redux'
import { cardToItem, DeckbuildingRules } from './DeckbuildingRules'
import { DeckList } from './DeckList'

const query = new URLSearchParams(window.location.search)
const locale = query.get('locale') || 'en'

export const DeckbuildingHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const deck = rules?.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems<CardId>().map(item => item.id!.front) ?? []
  const validator = new DeckValidator(deck)
  return <>
    <DeckListButton/>
    {' '}
    <SaveButton/>
    {' ~ ' + rules?.name + ' ~ '}
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
  const [open, setNameDialogOpen] = useState(false)
  const play = usePlay()
  const { data } = useMyDecks('arackhan-wars')
  const isSubscriber = !!useMe()?.user?.subscriptionSince
  const max = isSubscriber ? SUBSCRIBER_MAX_DECKS : DEFAULT_MAX_DECKS
  const hasMaxDecks = (data?.myDecks.length ?? 0) >= max
  const [maxDeckDialogOpen, setMaxDeckDialogOpen] = useState(false)

  const save = useCallback((name: string) => {
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    if (!storage.deck?.id && hasMaxDecks) {
      setMaxDeckDialogOpen(true)
      return
    }
    if (!name) {
      setNameDialogOpen(true)
      return
    }
    saveDeck({ variables: { id: storage.deck?.id, boardGame: 'arackhan-wars', name, cards } }).then(({ data: { saveDeck: deck } }) => {
      storage.deck = deck
      localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
      setDeck(deck)
    })
  }, [saveDeck, cards])

  const rename = useCallback((name: string) => {
    play(rules!.rename(name), { transient: true })
    save(name)
    setNameDialogOpen(false)
  }, [rules])

  return <>
    <ThemeButton onClick={() => save(rules?.name)} disabled={deck?.id && deck?.name === rules?.name && shallowEqual(deck?.cards, cards)}
                 title={t('deck.save')!}>
      <FontAwesomeIcon icon={faDownload}/>
    </ThemeButton>
    {' '}
    <ThemeButton onClick={() => setNameDialogOpen(true)} title={t('deck.rename')!}><FontAwesomeIcon icon={faPen}/></ThemeButton>
    <NameDeckDialog open={open} submit={rename} cancel={() => setNameDialogOpen(false)}/>
    <RulesDialog open={maxDeckDialogOpen} close={() => setMaxDeckDialogOpen(false)}>
      <div css={maxDeckDialogCss}>
        <h2>{t('max.deck')}</h2>
        <p>{t('max.deck.info', { max })}</p>
        {isSubscriber ?
          <p>{t('max.deck.delete')}</p>
          : <p>{t('max.deck.subscribe', { max: SUBSCRIBER_MAX_DECKS })}</p>
        }
        <div css={buttonLine}>
          <ThemeButton onClick={() => setMaxDeckDialogOpen(false)}>{t('OK')}</ThemeButton>
          {!isSubscriber &&
            <ThemeButton onClick={() => window.location.href = `${PLATFORM_URI}/${locale}/subscription`}>{t('Subscribe')}</ThemeButton>
          }
        </div>
      </div>
    </RulesDialog>
  </>
}

const maxDeckDialogCss = css`
  min-width: 25em;
  font-size: 3em;
  padding: 0 1em 1em;
`

const buttonLine = css`
  display: flex;
  justify-content: space-between;
`

const SUBSCRIBER_MAX_DECKS = 100
const DEFAULT_MAX_DECKS = 4

const DeckListButton = () => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  const [open, setOpen] = useState(false)
  const { data } = useMyDecks('arackhan-wars')
  const isSubscriber = !!useMe()?.user?.subscriptionSince

  const createNewDeck = useCallback(() => {
    play(rules!.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).deleteItemsAtOnce())
    play(rules!.rename(''), { transient: true })
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    storage.deck = {}
    localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
    setOpen(false)
  }, [rules])

  const [deleteDeck] = useDeleteDeck()
  const [deckToDelete, setDeckToDelete] = useState<Deck>()

  const openDeck = useCallback((deck: Deck) => {
    play(rules!.material(MaterialType.FactionCard).createItemsAtOnce(deck.cards.map((card, x) => cardToItem(card, { type: LocationType.PlayerDeck, x }))))
    play(rules!.rename(deck.name), { transient: true })
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    storage.deck = deck
    localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
    setOpen(false)
  }, [rules])

  const deleteAndCloseDeck = useCallback(() => {
    deleteDeck({ variables: { id: deckToDelete!.id } })
    const storage = JSON.parse(localStorage.getItem('arackhan-wars-deckbuilding')!)
    if (storage.deck?.id === deckToDelete!.id) {
      delete storage.deck.id
      localStorage.setItem('arackhan-wars-deckbuilding', JSON.stringify(storage))
    }
    setDeckToDelete(undefined)
  }, [deckToDelete])

  return <>
    <ThemeButton onClick={() => setOpen(true)} title={t('deck.list')!}><FontAwesomeIcon icon={faListCheck}/></ThemeButton>
    <RulesDialog open={open} close={() => setOpen(false)}>
      <div css={decksCss}>
        <h2>{t('deck.list')} ({data?.myDecks.length ?? '?'}/{isSubscriber ? SUBSCRIBER_MAX_DECKS : DEFAULT_MAX_DECKS})</h2>
        <ThemeButton onClick={createNewDeck}>{t('deck.create')!}</ThemeButton>
        <DeckList openDeck={openDeck} deleteDeck={setDeckToDelete}/>
      </div>
    </RulesDialog>
    <RulesDialog open={deckToDelete !== undefined}>
      <div css={confirmDeleteDialog}>
        <p>{t('deck.delete.confirm', { name: deckToDelete?.name })}</p>
        <div css={dialogButtons}>
          <ThemeButton onClick={() => setDeckToDelete(undefined)}>{t('Cancel')}</ThemeButton>
          <ThemeButton onClick={deleteAndCloseDeck}>{t('Confirm')}</ThemeButton>
        </div>
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

const confirmDeleteDialog = css`
  margin: 0 1em;
  font-size: 3em;
  display: flex;
  flex-direction: column;
  white-space: break-spaces;
`

const dialogButtons = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`

type NameDeckDialogProps = {
  submit: (name: string) => void
  cancel: () => void
} & DialogProps

const NameDeckDialog = ({ submit, cancel, ...props }: NameDeckDialogProps) => {
  const { t } = useTranslation()
  const rules = useRules<DeckbuildingRules>()
  const [name, setName] = useState<string>(rules?.name ?? '')
  useEffect(() => setName(rules?.name ?? ''), [rules?.name])
  return (
    <RulesDialog {...props} css={nameDialogCss}>
      <h2 css={css`margin: 0.5em 0;`}>{t('deck.name')}</h2>
      <input type="text" css={nameInput} maxLength={50} value={name} onChange={event => setName(event.target.value)}/>
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
  padding: 0.2em 0.5em
`

const nameDialogButtons = css`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
`
