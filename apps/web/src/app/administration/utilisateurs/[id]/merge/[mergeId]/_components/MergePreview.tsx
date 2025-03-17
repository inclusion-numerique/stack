import { MergeData, MergeInfo } from '../getMergeData'
import { MergeDiff } from './MergeDiff'

export const MergePreview = ({
  merge,
  common,
  source,
}: {
  merge: MergeInfo
  common: MergeData
  source?: MergeData
}) => (
  <>
    <h2 className="fr-h6 fr-flex fr-flex-gap-2v">
      <span
        className={source == null ? 'ri-user-unfollow-line' : 'ri-group-line'}
        aria-hidden={true}
      />
      <span className="fr-flex fr-direction-column">
        {merge.name}
        <span className="fr-text-mention--grey fr-text--sm fr-mb-0">
          {merge.email}
        </span>
      </span>
    </h2>
    <ul>
      <li>
        Beneficiaires&nbsp;: {merge.beneficiaireIds.length ?? 0}
        <MergeDiff
          isAddition={source != null}
          sourceIds={source?.beneficiaireIds ?? merge.beneficiaireIds}
          commonIds={common.beneficiaireIds}
        />
      </li>
      <li>
        Activités&nbsp;: {merge.activitesIds.length ?? 0}
        <MergeDiff
          isAddition={source != null}
          sourceIds={source?.activitesIds ?? merge.activitesIds}
          commonIds={common.activitesIds}
        />
      </li>
      <li>
        Structures employeuses&nbsp;:{' '}
        {merge.structureEmployeusesIds.length ?? 0}
        <MergeDiff
          isAddition={source != null}
          sourceIds={
            source?.structureEmployeusesIds ?? merge.structureEmployeusesIds
          }
          commonIds={common.structureEmployeusesIds}
        />
      </li>
      <li>
        Lieux d’activité&nbsp;: {merge.lieuxActiviteIds.length ?? 0}
        <MergeDiff
          isAddition={source != null}
          sourceIds={source?.lieuxActiviteIds ?? merge.lieuxActiviteIds}
          commonIds={common.lieuxActiviteIds}
        />
      </li>
      <li>
        Équipes&nbsp;: {merge.coordinationsIds.length ?? 0}
        <MergeDiff
          isAddition={source != null}
          sourceIds={source?.coordinationsIds ?? merge.coordinationsIds}
          commonIds={common.coordinationsIds}
        />
      </li>
      <li>
        Invitations reçues&nbsp;: {merge.invitationsRecues.length ?? 0}
        <MergeDiff
          isAddition={source != null}
          sourceIds={source?.invitationsRecues ?? merge.invitationsRecues}
          commonIds={common.invitationsRecues}
        />
      </li>
      <li>
        Mutations&nbsp;: {merge.mutationsIds.length ?? 0}
        <MergeDiff
          isAddition={source != null}
          sourceIds={source?.mutationsIds ?? merge.mutationsIds}
          commonIds={common.mutationsIds}
        />
      </li>
    </ul>
  </>
)
