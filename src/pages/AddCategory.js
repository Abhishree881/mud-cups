import React from 'react'
import { connect } from 'react-redux';
import { addToMenu } from '../Actions/MenuActions';

function AddCategory(props) {
    const sampleData = {
        index: 5,
        name: "Italian",
        len: 5,
        imgUrl: "https://img.freepik.com/premium-photo/hamburger-with-toothpick-it-small-toothpick-top_442337-492.jpg",
    }
    return (
        <div>
            <button onClick={() => props.addToMenu(sampleData)}>Click me</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    menu: state.menuReducer.menu
});

const mapDispatchToProps = {
    addToMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)