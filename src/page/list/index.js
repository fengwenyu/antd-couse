import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';


class List extends React.Component {
    render(){
      return(
          <div>
              hello world this is list
          </div>
      );
    }
}

function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        cardsLoading: state.loading.effects['cards/queryList'],
    };
}

export default connect(mapStateToProps)(List);