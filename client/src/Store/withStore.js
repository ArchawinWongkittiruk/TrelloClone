import useStore from "./useStore";

export default function withStore(store, Component){
    return (props) => {
        const context = useStore(store)
        return <Component store={context.store} props={props} />;
    };

}