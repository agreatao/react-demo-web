import React, { useEffect, useState } from "react";

export default function asyncComponent(loadComponent) {
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
