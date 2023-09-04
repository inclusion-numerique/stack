import React from 'react'

const ContactInfo = ({
  contact: { nom, prenom, fonction, email },
}: {
  contact: {
    nom: string
    prenom: string
    fonction: string
    email: string
  }
}) => (
  <>
    {nom} {prenom}, {fonction} <br />
    {email}
  </>
)

export default ContactInfo
