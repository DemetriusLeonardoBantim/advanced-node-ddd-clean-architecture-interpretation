import { addAlias } from 'module-alias'
import * as path from 'node:path'

addAlias('@', path.resolve('dist'))
