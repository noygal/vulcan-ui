var React = require('react');

var CollapsibleSection = require('./CollapsibleSection.js').CollapsibleSection;

export class Layout extends React.Component {
  render() {
    return (
      <div>
        <CollapsibleSection title="Hello World!">
          We are using io.js { process.version } <br/>
          and Electron {process.versions['electron']}.
        </CollapsibleSection>
      </div>
    );
  }
}
