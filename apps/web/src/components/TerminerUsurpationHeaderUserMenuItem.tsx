import { terminerUsurpation } from '@app/web/app/administration/usurpation/terminerUsurpation'

const TerminerUsurpationHeaderUserMenuItem = () => (
  <li>
    <form action={terminerUsurpation}>
      <button className="fr-nav__link" type="submit">
        <span
          className="fr-icon-user-star-line fr-icon--sm fr-mr-1w"
          style={{ color: 'var(--blue-france-sun-113-625)' }}
        />
        Terminer usurpation
      </button>
    </form>
  </li>
)

export default TerminerUsurpationHeaderUserMenuItem
