/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { buttonResetCss, usePlay, useRules } from '@gamepark/react-game'
import { DeckbuildingRules } from './DeckbuildingRules'

export const Pagination = () => {
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  const page = rules?.page
  const maxPage = rules?.maxPage
  return <div css={pagination}>
    <button css={paginationButton} disabled={page === 1} onClick={() => play(rules?.changePage(page - 1))}>
      <FontAwesomeIcon icon={faChevronLeft} css={iconCss}/>
    </button>
    <span css={currentPage}>{page}/{maxPage}</span>
    <button css={paginationButton} disabled={page === maxPage} onClick={() => play(rules?.changePage(page + 1))}>
      <FontAwesomeIcon icon={faChevronRight} css={iconCss}/>
    </button>
  </div>
}

const pagination = css`
  position: absolute;
  height: fit-content;
  align-content: baseline;
  top: auto;
  bottom: 0.5em;
  left: 22.35em;
  display: flex;
  transform: translateX(-50%);
`

const currentPage = css`
  font-size: 2em;
  margin: 0 0.5em;
`

const paginationButton = [buttonResetCss, css`
  font-size: 1.6em;
  height: 1.6em;
  width: 1.6em;
  border-radius: 2em;
  transition: transform 0.1s ease-in-out;
  border: 0.1em solid white;
  color: inherit;
  background: transparent;
  padding: 0;
  filter: drop-shadow(0.1em 0.1em 0.05em black);

  &:disabled {
    color: #a0a0a0;
    border-color: #a0a0a0;
  }

  &:not(:disabled) {
    &:focus, &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(1.05);
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

`]

const iconCss = css`
  color: inherit;
`