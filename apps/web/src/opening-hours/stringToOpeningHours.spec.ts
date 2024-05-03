import type { OpeningHours } from '@app/web/opening-hours/openingHours'
import { stringToOpeningHours } from './stringToOpeningHours'

describe('stringToOpeningHours', () => {
  const testCases = [
    [
      'lundi au vendredi de 7h00 à 19h00',
      {
        parser: 'na',
        comment: 'lundi au vendredi de 7h00 à 19h00',
        week: null,
      },
    ],
    [
      "Possibilité d'accueil le samedi en fonction du nombre d'enfants inscrits",
      {
        parser: 'na',
        comment:
          "Possibilité d'accueil le samedi en fonction du nombre d'enfants inscrits",
        week: null,
      },
    ],
    [
      'mardis et jeudis matin de 9h15 à 11h45 (sauf pendant les vacances scolaires)',
      {
        parser: 'na',
        comment:
          'mardis et jeudis matin de 9h15 à 11h45 (sauf pendant les vacances scolaires)',
        week: null,
      },
    ],
    [
      "À la Maison des aînés et des aidants : Du lundi au vendredi : Sur RDV le matin 9h - 12h30 Sur RDV de préférence l'après-midi de 13h30 à 17h30",
      {
        parser: 'na',
        comment:
          "À la Maison des aînés et des aidants : Du lundi au vendredi : Sur RDV le matin 9h - 12h30 Sur RDV de préférence l'après-midi de 13h30 à 17h30",
        week: null,
      },
    ],
    [
      'lundi au vendredi : 8h15-19h20, samedi : 9h30-17h30, dimanche : 11h45-20h.',
      {
        parser: 'na',
        comment:
          'lundi au vendredi : 8h15-19h20, samedi : 9h30-17h30, dimanche : 11h45-20h.',
        week: null,
      },
    ],
    [
      'We 13:00-18:00;Th 10:00-12:00,13:00-18:00;Fr 13:00-18:00;Sa 10:00-12:00,13:00-18:00',
      {
        parser: 'oh',
        comment: null,
        week: {
          monday: null,
          tuesday: null,
          wednesday: {
            morning: null,
            afternoon: {
              start: '13:00',
              end: '18:00',
            },
          },
          thursday: {
            morning: {
              start: '10:00',
              end: '12:00',
            },
            afternoon: {
              start: '13:00',
              end: '18:00',
            },
          },
          friday: {
            morning: null,
            afternoon: {
              start: '13:00',
              end: '18:00',
            },
          },
          saturday: {
            morning: {
              start: '10:00',
              end: '12:00',
            },
            afternoon: {
              start: '13:00',
              end: '18:00',
            },
          },
          sunday: null,
        },
      },
    ],
    [
      'We 13:30-17:00',
      {
        parser: 'oh',
        comment: null,
        week: {
          monday: null,
          tuesday: null,
          wednesday: {
            morning: null,
            afternoon: {
              start: '13:30',
              end: '17:00',
            },
          },
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
    ],
    [
      'We 13:30-17:00; "La Conseillère en Insertion Professionnelle est disponible UNIQUEMENT le mercredi de 13h30 à 17h00"',
      {
        parser: 'oh',
        comment:
          'La Conseillère en Insertion Professionnelle est disponible UNIQUEMENT le mercredi de 13h30 à 17h00',
        week: {
          monday: null,
          tuesday: null,
          wednesday: {
            morning: null,
            afternoon: {
              start: '13:30',
              end: '17:00',
            },
          },
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
    ],
    [
      'Permanences du lundi au vendredi, de 8h30 à 17h, sur rendez-vous',
      {
        parser: 'na',
        comment:
          'Permanences du lundi au vendredi, de 8h30 à 17h, sur rendez-vous',
        week: null,
      },
    ],
    [
      'Th 09:30-12:00,13:30-16:30; "Jeudi en semaine paire"',
      {
        parser: 'oh',
        comment: 'Jeudi en semaine paire',
        week: {
          monday: null,
          tuesday: null,
          wednesday: null,
          thursday: {
            morning: {
              start: '09:30',
              end: '12:00',
            },
            afternoon: {
              start: '13:30',
              end: '16:30',
            },
          },
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
    ],
    [
      'Mo 09:30-12:00;Tu 14:00-17:00;Th 14:00-17:00; "Horaires des permanences: le lundi à Chambéry, le mardi à Albertville et le jeudi à Aix-les-Bains"',
      {
        parser: 'oh',
        comment:
          'Horaires des permanences: le lundi à Chambéry, le mardi à Albertville et le jeudi à Aix-les-Bains',
        week: {
          monday: {
            morning: {
              start: '09:30',
              end: '12:00',
            },
            afternoon: null,
          },
          tuesday: {
            morning: null,
            afternoon: {
              start: '14:00',
              end: '17:00',
            },
          },
          wednesday: null,
          thursday: {
            morning: null,
            afternoon: {
              start: '14:00',
              end: '17:00',
            },
          },
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
    ],
    [
      '',
      {
        parser: 'na',
        comment: null,
        week: null,
      },
    ],
    [
      null,
      {
        parser: 'na',
        comment: null,
        week: null,
      },
    ],
    [
      '   ',
      {
        parser: 'na',
        comment: null,
        week: null,
      },
    ],
    [
      'Mo-Fr 09:00-17:00; Sa off',
      {
        parser: 'oh',
        comment: null,
        week: {
          monday: {
            morning: { start: '09:00', end: '17:00' },
            afternoon: null,
          },
          tuesday: {
            morning: { start: '09:00', end: '17:00' },
            afternoon: null,
          },
          wednesday: {
            morning: { start: '09:00', end: '17:00' },
            afternoon: null,
          },
          thursday: {
            morning: { start: '09:00', end: '17:00' },
            afternoon: null,
          },
          friday: {
            morning: { start: '09:00', end: '17:00' },
            afternoon: null,
          },
          saturday: 'closed',
          sunday: null,
        },
      },
    ],
    [
      'Mo off; We 09:00-11:00',
      {
        parser: 'oh',
        comment: null,
        week: {
          monday: 'closed',
          tuesday: null,
          wednesday: {
            morning: { start: '09:00', end: '11:00' },
            afternoon: null,
          },
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
    ],
    [
      'Tu-Fr 09:00-12:00 off',
      {
        parser: 'oh',
        comment: null,
        week: {
          monday: null,
          tuesday: 'closed',
          wednesday: 'closed',
          thursday: 'closed',
          friday: 'closed',
          saturday: null,
          sunday: null,
        },
      },
    ],
    [
      'Mo 09:00-11:00, off',
      {
        parser: 'oh',
        comment: null,
        week: {
          monday: {
            morning: { start: '09:00', end: '11:00' },
            afternoon: 'closed',
          },
          tuesday: null,
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
    ],
  ] satisfies [string | null, OpeningHours & { parser: string }][]

  test.each(testCases)('case %# : %s', (input, expected) => {
    const result = stringToOpeningHours(input)
    expect(result).toEqual(expected)
  })
})
