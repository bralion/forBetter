import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import { Layout, Menu, Breadcrumb, Icon, Button, Tabs, Row, Col } from 'antd';
import util from 'dashboard_2_7/dashboard/util/util'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

class Menus extends Component {

    constructor(props) {
        super(props)
        this.allConfig = props.allMenuConfig;
    }
    //兼容写法  拖拽事件
    menuDrag(e) {
        let type = e.target.dataset['type'];
        window.dashboardType = type;
        if (navigator.userAgent.indexOf("Firefox") > -1) {
            e.dataTransfer.setData("type", type);
        }
    }

    /**
     * 移除GIS组件
     * @param {Array} list 
     */
    removeGis(list) {
        list = [...list];
        let arr = ['heatMap', 'markerMap', 'routeMap', 'migrateMap'];
        for (let i = 0; i < list.length; i++) {
            let { type } = list[i];
            if (arr.indexOf(type) !== -1) {
                list.splice(i, 1);
                i--;
            }
        }
        return list;
    }

    /**
     * 移除自定义组件
     * @param {Array} list 
     */
    removeCustom(list) {
        list = [...list];
        let arr = ['custom'];
        for (let i = 0; i < list.length; i++) {
            let { type } = list[i];
            if (arr.indexOf(type) !== -1) {
                list.splice(i, 1);
                i--;
            }
        }
        return list;
    }

    render() {
        let { auth } = this.props;
        // let gisAuth = util.getAuth(auth, 'gis');
        // let customAuth = util.getAuth(auth, 'custom');

        return <Menu
            className="menus"
            theme="light"
            defaultSelectedKeys={['1']}
            onOpenChange={this.props.onOpenChange}
            mode="inline"
            style={{ backgroundColor: "#E9EFF2" }}
            defaultOpenKeys={Object.keys(this.allConfig).map((e, i) => 'sub' + i)}
        >
            {
                this.allConfig.map((item, ind) => {
                    let { children } = item;
                    // if (!gisAuth) {
                    //     children = this.removeGis(children)
                    // }
                    // if (!customAuth) {
                    //     children = this.removeCustom(children)
                    // }
                    return <SubMenu
                        key={'sub' + ind}
                        title={
                            <span>
                                <i className={"anticon layout-icon " + item.icon}></i>
                                <span style={{ fontWeight: 800 }}>{item.name}</span>
                            </span>
                        }
                        className="menu-row">
                        {
                            new Array(Math.ceil(children.length / 3)).fill(1).map((v, k) => {
                                return <Menu.Item key={`sub${ind}-${k}`}>
                                    <Row type="flex">
                                        {
                                            children.slice(3 * k, 3 * (k + 1)).map((col, ixxx) => {
                                                return <Col span={8}
                                                    key={ixxx} >
                                                    {
                                                        col.$$custom ?
                                                            <i title={col.cname}
                                                                data-type={col.type}
                                                                draggable="true"
                                                                onDragStart={e => this.menuDrag(e)}
                                                                style={{
                                                                    backgroundImage: `url( ${col.icon} )`,
                                                                    backgroundSize: '100%'
                                                                }}
                                                                className="side-icon">
                                                            </i>
                                                            : <i title={col.cname}
                                                                data-type={col.type}
                                                                draggable="true"
                                                                onDragStart={e => this.menuDrag(e)}
                                                                className={`side-icon ${col.icon}`}>
                                                            </i>
                                                    }
                                                </Col>
                                            })
                                        }
                                    </Row>
                                </Menu.Item>
                            })
                        }
                    </SubMenu>
                })
            }
        </Menu>
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        auth: state.system.auth,
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {

    };
}

// export default App;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menus);
