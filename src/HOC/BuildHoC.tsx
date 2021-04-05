import React from "react";

export function BuildHoC<TParentProps, TChildProps>(
  ParentComponent: React.ComponentType<TParentProps>,
  mapParentProps?: (childProps: TChildProps) => TParentProps
) {
  return function _(ChildComponent: React.ComponentType<TChildProps>) {
    function _(componentProps: TChildProps) {
      const props = mapParentProps ? mapParentProps({ ...componentProps }) : ({} as TParentProps);
        console.log(componentProps);
      return (
        <ParentComponent {...props}>
          <ChildComponent {...componentProps} />
        </ParentComponent>
      );
    }

    _.displayName = `${ParentComponent.name}.Hoc`;

    return _;
  };
}
