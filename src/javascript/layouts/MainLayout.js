import { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import MenuBar from './MenuBar/index.js';
import ComponentSider from './ComponentSider';
import DesignView from './DesignView';
import DraggableSiderTools from '../components/Config/DraggableSiderTools/index.js';
import DevTools from '../components/DevTools/index.js';
import { 
  Layout, 
  Menu, 
  Breadcrumb, 
  Icon,
  Input,
  Table,
  Modal,
  Tabs,
  Tree,
  Button,
} from 'antd';

import ConfigTable from '../components/Config/ConfigTable.js';
import Draggable from 'react-draggable';
import Storage from '../utils/Storage.js'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

import MainLayoutStyle from './MainLayout.scss';
import _ from 'lodash';
import defaultBasicProps from '../components/Config/BasicProps/defaultBasicProps.js';

const store = new Storage('configModel');

class MainLayout extends Component {

  constructor(props) {
    super(props);

    let {
      collapsed,
      data,
      focusId,
      mode,
      configModel,
      editModalVisible,
    } = props;
    
    this.state = {
      collapsed,
      data,
      focusId,
      mode,
      editModalVisible,
      configModel,
    };
  }

  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'UPDATE_COLLAPSED',
      payload: {
        collapsed,
        mode: collapsed ? 'vertical' : 'inline',
      }
    });
  }

  handleMenuClick = (obj) => {

    this.props.dispatch({
      type: 'ADD_COMPONENT',
      payload: {
        id: obj.key,
        position: 'header',
        tabIndex: 0,
      }
    });
  }

  handleCancel() {
    this._dismissModal();
  }

  _dismissModal() {
    this.props.dispatch({
      type: 'SET_MODAL_VISIBILITY',
      payload: false,
    });
  }

  handleOk() {
    this._confirmModalConfig(true);
    this._dismissModal();
  }

  _confirmModalConfig(confirmAllFlag = false, reopen = false) {
    let configTable = this.refs['configTable'];

    // TODO：
    // if confirmAllFlag is setted to true, we apply all config panels

    let activeConfigKey = configTable.__getActiveConfigTabKey();
    let model = configTable.__getDataModel.call(configTable);

    if (activeConfigKey == 2) {
      this.props.dispatch({
        type: 'UPDATE_COMPONENT_DATASOURCE',
        payload: {
          dataSource: model,
        },
      });
    } else {
      this.props.dispatch({
        type: 'UPDATE_COMPONENT_BASIC_PROPS',
        payload: {
          basicProps: model,
        },
      });
    }

    if (reopen) {
      this.props.dispatch({
        type: 'REEDIT_COMPONENT',
      });
    }
    
  }

  componentWillReceiveProps(nextProps) {
    let {
      data,
      configModel,
    } = nextProps;

    this.setState({
      data,
      configModel,
    });
  }

  componentWillUnmount() {
    store.destory();
  }

  render() {

    let { 
      editModalVisible,
      dispatch,
      collapsed,
    } = this.props;

    let {
      data,
      configModel,
    } = this.state;

    console.log('current config model', configModel);

    if (!configModel) {
      configModel = {
        basicProps: _.cloneDeep(defaultBasicProps),
      }
    }

    console.log('fixed config model', configModel);

    let mainHeaderStyleObj = { 
      background: 'rgba(0,0,0,0.75)', 
      padding: 0,
      height: '32px',
      lineHeight: '32px', 
    };    

    let viewContainerStyleObj = { 
      margin: 2, 
      maxWidth: 980, 
      minHeight: 560, 
      overflow: 'auto',
    };

    return (
      <Layout>
       <Header style={mainHeaderStyleObj} >
        <MenuBar />
       </Header>
       <Layout style={{ height: '100vh' }}>

        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          style={{ overflow: 'auto' }}
          collapsedWidth={40}
        >
          <div className="logo" />
          <ComponentSider 
            handleMenuClick={this.handleMenuClick}
          />
        </Sider>
        <Layout>
          <Content style={viewContainerStyleObj}>
            <div style={{ padding: '5px', background: '#fff'}}>
              <DesignView 
                dispatch={dispatch}
                data={data}
              />
            </div>
            <Footer style={{ textAlign: 'center' }}>
              StatusBar: IntelliForm ©2017 Created by overkazaf
            </Footer>
          </Content>
          <Sider
            style={{ background: 'transparent', padding: '4px'}}
          >
            <DraggableSiderTools />
          </Sider>
        </Layout>
      </Layout>
      <Layout>
       <Draggable 
         grid={[1, 1]} 
         handle=".if-draggable-modal-header" 
         onDrag={handleDrag}>
          <div style={{
            position: 'absolute',
            left: '50%',
            marginLeft: '-400px',
            top: '100px',
            width: '800px',
            background: '#222',
            border: '1px solid #aaa',
            boxShadow: '1px 1px 10px #000',
            zIndex: '1000',
            background: '#fff',
            padding: '15px',
            borderRadius: '8px',
            display: editModalVisible ? 'block' : 'none'
          }}>
            <style dangerouslySetInnerHTML={{ __html: MainLayoutStyle}} />
              <div className="if-draggable-modal-content">
                <div className="if-draggable-modal-header" style={{ cursor: 'move'}}>
                  <h2>参数配置</h2>
                  <span className="close" onClick={this.handleCancel.bind(this)}>
                    <Icon type="close-circle" />
                  </span>
                </div>
                <div className="if-draggable-modal-body">
                  <ConfigTable 
                    ref="configTable" 
                    config={configModel}
                    onApply={this._confirmModalConfig.bind(this, false, true)}
                    />
                </div>
                <div className="if-draggable-modal-footer">
                  <Button size="large" onClick={this.handleOk.bind(this)} type="primary">保存所有配置</Button>
                  <Button size="large" onClick={this.handleCancel.bind(this)} type="default">取消</Button>
                </div>
              </div>
              </div>
        </Draggable>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = ($$state, ownProps) => {
  return $$state.get('mainLayoutReducer').toJS();
}

export default connect(mapStateToProps)(MainLayout);


function handleDrag(...args) {
}