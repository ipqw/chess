import { observer } from "mobx-react";
import styled from "styled-components";
import Header from "./Header";

const WrapperApp = observer(({children}: {children: any}) => {
    return(
        <Wrapper>
            <Header />
            {children}
        </Wrapper>
    )
})

const Wrapper = styled.div`
    background: rgb(29,29,29);
    background: radial-gradient(circle, rgba(29,29,29,1) 66%, rgba(38,38,38,1) 100%);
    min-height: 100lvh;
    overflow-x: hidden;
`


export default WrapperApp