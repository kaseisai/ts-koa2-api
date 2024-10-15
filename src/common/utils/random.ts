import { randomInt } from 'crypto'

import { snowflakeGenerator } from 'snowflake-id-js'

const machineId = randomInt(1024)
const generator = snowflakeGenerator(machineId)

export function genSnowflakeId (): string {
  const value = generator.next().value
  return value.toString()
}

export function randomPick (array: any[], size: number): any[] {
  if (array.length <= size) {
    return array
  }

  for (const item of array) {
    item.value = randomInt(2 ** 31)
  }
  array.sort((a, b) => a.value - b.value)

  return array.slice(0, size)
}
