import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'
import { createSlug } from '@app/web/utils/createSlug'

export const createAvailableSlug = (
  title: string,
  table: 'bases' | 'resources' | 'profiles' | 'collections',
) => findFirstAvailableSlug(createSlug(title), table)
