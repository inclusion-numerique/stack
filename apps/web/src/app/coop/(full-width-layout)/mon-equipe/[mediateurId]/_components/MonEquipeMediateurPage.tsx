import React from 'react'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import Contract from '@app/web/components/conseiller-numerique/Contract'
import { StructureEmployeuse } from '@app/web/components/structure/StructureEmployeuse'
import Identity from './Identity'
import { LieuxActivites } from './LieuxActivites'
import { Statistiques } from './Statistiques'

export const MonEquipeMediateurPage = ({
  id,
  user,
  conseillerNumerique,
  statistiques,
  structureEmployeuse,
  contract,
  lieuxActivites,
}: {
  id: string
  user: { name: string | null; email: string; phone: string | null }
  conseillerNumerique: { id: string } | null
  statistiques: { beneficiairesAccompagnes: number; accompagnements: number }
  structureEmployeuse: {
    id: string
    structure: {
      nom: string
      adresse: string
      commune: string
      codePostal: string
      codeInsee: string | null
      complementAdresse: string | null
      siret: string | null
      rna: string | null
      typologies: string[]
    }
  } | null
  contract: {
    type: string
    start: string | null
    end: string | null
    finDeContrat: boolean | null
  } | null
  lieuxActivites: {
    id: string
    modification: Date
    structure: {
      id: string
      nom: string
      adresse: string
      complementAdresse?: string | null
      commune: string
      codePostal: string
      typologies: string[]
      siret?: string | null
      rna?: string | null
      _count: { mediateursEnActivite: number }
    }
    creation: Date
  }[]
}) => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <div className="fr-container fr-container--800">
      <CoopBreadcrumbs
        parents={[
          { label: 'Mon équipe', linkProps: { href: '/coop/mon-equipe' } },
        ]}
        currentPage={user.name ?? 'Médiateur'}
      />
      <main id={contentId} className="fr-mb-16w">
        <section className="fr-my-10v">
          <Identity
            {...user}
            mediateurId={id}
            isConseillerNumerique={conseillerNumerique?.id != null}
          />
        </section>
        <section className="fr-p-8v fr-border-radius--16 fr-background-alt--brown-caramel">
          <Statistiques mediateurId={id} {...statistiques} />
        </section>
        {conseillerNumerique?.id != null && contract && (
          <section className="fr-mt-6v">
            <Contract isCoordinateur={false} {...contract} />
          </section>
        )}
        {structureEmployeuse != null && (
          <section className="fr-mt-6v">
            <StructureEmployeuse
              showTitle
              isLieuActivite={false}
              id={structureEmployeuse.id}
              {...structureEmployeuse.structure}
            />
          </section>
        )}
        <section className="fr-mt-6v">
          <LieuxActivites lieuxActivites={lieuxActivites} mediateurId={id} />
        </section>
      </main>
    </div>
  </>
)
