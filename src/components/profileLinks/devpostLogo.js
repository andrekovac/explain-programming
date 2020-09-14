import * as React from 'react';

function DevpostLogo(props) {
  return (
    <svg
      viewBox="0 0 909 775"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      width={props.size || '1em'}
      height={props.size || '1em'}
      {...props}
    >
      <use
        xlinkHref="#prefix___Image1"
        x={18}
        y={34}
        width={220}
        height={188}
        transform="translate(-79.167 -145.833) scale(4.16667)"
      />
      <defs>
        <image
          id="prefix___Image1"
          width={220}
          height={188}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export default DevpostLogo;
