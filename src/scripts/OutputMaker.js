/**
*
* js
*
*/

import FactorDefinition from '@/scripts/FactorDefinition'

let OutputMaker = {}
export default OutputMaker

//
OutputMaker.createStyleText = function(work, factors) {
  //

  let factorsSpecific = factors.map((factor) => {
    let className = FactorDefinition.createOutputClassName(factor)
    return FactorDefinition.createCssTextByType(factor, className);
  }).join('\n\n');
  //
  let workSpecific = '';

  //
  const CONST_CSS = FactorDefinition.readConstCssText()
  let css = [
    '/* Spinner - Common */\n\n',
    CONST_CSS,
    '\n\n/* Spinner - By Element */\n\n',
    factorsSpecific,
    workSpecific
  ].join('')
  return css
}

//
OutputMaker.createHtmlText = function(work, factors) {
  let cls = FactorDefinition.getFixedClassNames()
  let htmlItems = factors.map((factor) => {
    let clsByType = cls[factor.type]
    let clsSpecific = FactorDefinition.createOutputClassName(factor)
    let content = typeof factor.text === 'string' ? factor.text : '';
    return `<div class="${clsByType} ${clsSpecific}">${content}</div>`;
  }).join('\n    ');

  let bg = work.isDark ? 'black' : 'white'
  let html = `
<div style="width: 200px; height: 200px; border: 1px solid gray; background: ${bg};">
  <div class="factor-frame">
    ${htmlItems}
  </div>
</div>
`;

  return html;
}









