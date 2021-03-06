import React, { Component } from 'react';
import styled               from 'styled-components';
import { withRouter }       from 'react-router-dom';
import { connect }          from 'react-redux';
import { Grid, Row, Col }   from 'react-flexbox-grid';
import PropTypes            from 'prop-types';

import * as styles          from '../../../styles/consts';

import TextButton           from '../../../elements/buttons/textButton';
import RoundedButton        from '../../../elements/buttons/roundedButton';
import DefaultLink          from '../../../elements/links/defaultLink';

import { logout }           from '../../../redux/actions/authAction';

class DefaultHeader extends Component{
    constructor(props){
        super(props);

        this.handleLogoutButton = this.handleLogoutButton.bind(this);
    }

    handleLogoutButton = (e) => {
        if(this.props.auth.isAutintificated){
            localStorage.clear();
            this.props.logout(); 
        }
    }

    render(){
        const { isAutintificated } = this.props.auth;
        return(
            <Element>
                <Grid fluid>
                    <Row>
                        <NavCol lg={10} md={10}>
                            <TextButton>
                                <DefaultLink to='/'>
                                    HOME
                                </DefaultLink>
                            </TextButton>
                            <TextButton>
                                <DefaultLink to='/profile'>
                                    PROFILE
                                </DefaultLink>
                            </TextButton>
                            <TextButton>
                                <DefaultLink to='/news'>
                                    NEWS
                                </DefaultLink>
                            </TextButton>
                        </NavCol>
                        <LogoutCol lg={2} md={2}>
                            <RoundedButton
                                onClick={this.handleLogoutButton}
                                text={isAutintificated
                                    ? <DefaultLink inverted to='/'>LOGOUT</DefaultLink>
                                    : <DefaultLink inverted to='/login'>LOGIN</DefaultLink>
                                }>
                            </RoundedButton>
                        </LogoutCol>
                    </Row>
                </Grid>
            </Element>
        );
    }
}

DefaultHeader.PropTypes = {
    auth: PropTypes.shape({
        id: PropTypes.string,
        error: PropTypes.string,
        isFetchng: PropTypes.bool,
        isAutintificated: PropTypes.bool
    }),
    logout: PropTypes.func
}

const Element = styled.div`
    width: 100%;
    background-color: ${styles.main};
`;

const NavCol = styled(Col)`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const LogoutCol = styled(Col)`
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
`;

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispath) => ({
    logout: () => dispath(logout())
})
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DefaultHeader)
);
