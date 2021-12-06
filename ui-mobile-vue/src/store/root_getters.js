export const RootGetters/*: GetterTree<RootState, RootState>*/ = {
    appliParams({ larksr }) {
        return larksr ? larksr.params : {};
    },
}

export default RootGetters;