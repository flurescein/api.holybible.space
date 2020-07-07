import { SelectQueryBuilder } from 'typeorm'

export function applyMultipleWhere<EntityType>(
  query: SelectQueryBuilder<EntityType>,
  whereValues: object
) {
  for (const [key, value] of Object.entries(whereValues)) {
    query.andWhere(`Verse.${key} = :${key}`, { [key]: value })
  }
}
