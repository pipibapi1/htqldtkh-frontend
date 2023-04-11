import { render, screen } from "@testing-library/react"
import SideNav from "."
import { RoleType } from "../../shared/types/role"
import { appRouters } from "../../shared/urlResources"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../store"

describe("test Side Navigation Component", () => {
    test("falcuty secretary side navigation renders correctly", () => {
        render(
        <Provider store={store}>
            <HashRouter>
                <SideNav role={RoleType.FS} pathName={"/" + appRouters.LINK_TO_FS_TOPIC_STATISTIC}/>
            </HashRouter>
        </Provider>
        
        )
        const textElement1 = screen.getByText("TẠO HỘI ĐỒNG");
        const textElement2 = screen.getByText("HĐ xét duyệt");
        expect(textElement1).toBeInTheDocument();
        expect(textElement2).toBeInTheDocument();
    })
})