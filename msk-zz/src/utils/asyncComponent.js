import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";

export function asyncLoadComponent(loadComponent) {
    return loadable(loadComponent, {
        fallback: <div className="loading"></div>,
    });
}

export function asyncComponent(loadComponent) {
    return function AsyncComponent(props) {
        const [Component, setComponent] = useState(null);

        useEffect(() => {
            typeof loadComponent === "function" &&
                loadComponent()
                    .then((module) => setComponent(module.default))
                    .catch((e) => {});

            return () => {
                setComponent(null);
            };
        }, []);

        return Component && <Component {...props} />;
    };
}
