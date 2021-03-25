import mjml2html, { components, assignComponents } from 'mjml-core-node6'
import { dependencies, assignDependencies } from 'mjml-validator-node6'
import presetCore from 'mjml-preset-core-node6'

assignComponents(components, presetCore.components)
assignDependencies(dependencies, presetCore.dependencies)

export default mjml2html
