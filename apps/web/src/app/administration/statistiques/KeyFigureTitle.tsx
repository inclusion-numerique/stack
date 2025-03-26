import { ReactNode } from 'react'

const KeyFigureTitle = ({
  type,
  children,
}: {
  type: 'conum' | 'mediateur' | 'coordoConum' | 'coordoHD'
  children: ReactNode
}) => (
  <div className="fr-flex fr-align-items-center">
    <div
      className="fr-background-alt--blue-cumulus"
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {type === 'conum' && (
        <img
          src="/images/iconographie/profil-conseiller-numerique.svg"
          alt=""
          style={{
            width: '48px',
            height: '48px',
          }}
        />
      )}
      {type === 'mediateur' && (
        <img
          src="/images/iconographie/profil-mediateur.svg"
          alt=""
          style={{
            width: '48px',
            height: '48px',
          }}
        />
      )}
      {type === 'coordoConum' && (
        <img
          src="/images/iconographie/profil-coordinateur-conseiller-numerique.svg"
          alt=""
          style={{
            width: '48px',
            height: '48px',
          }}
        />
      )}
      {type === 'coordoHD' && (
        <img
          src="/images/iconographie/profil-coordinateur.svg"
          alt=""
          style={{
            width: '48px',
            height: '48px',
          }}
        />
      )}
    </div>
    <span className="fr-h2 fr-mb-0 fr-ml-2w">{children}</span>
  </div>
)

export default KeyFigureTitle
