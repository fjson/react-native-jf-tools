import React, {Fragment, PureComponent} from 'react';
import {View, Animated, Text, Easing} from "react-native";
import propTypes from 'prop-types';

export class JRNMarquee extends PureComponent{
    transformX= new Animated.Value(0);
    state = {
        containerWidth:0
    };

    constructor(props) {
        super(props);
    }

    render() {
        let { text } = this.props;
        return (
            <View style={{  flexDirection:'row', overflow:'hidden', height:'100%', alignItems:'center' }} onLayout={({ nativeEvent:{ layout:{ width } }}) => this.setState({ contentWidth:width })}>
                {
                    this.state.contentWidth === undefined ? null :(
                        <Fragment>
                            <Animated.Text
                                ref={(container) => this.container = container}
                                style={
                                    [
                                        {
                                            position:'absolute', minWidth:this.state.contentWidth, left:this.transformX.interpolate({
                                                inputRange:[0,1],
                                                outputRange:[0,-this.state.containerWidth]
                                            })
                                        },
                                        this.props.style
                                    ]
                                }
                            >{ text }</Animated.Text>
                            <Animated.Text
                                style={
                                    [
                                        {
                                            position:'absolute', minWidth:this.state.contentWidth, left:this.transformX.interpolate({
                                                inputRange:[0,1],
                                                outputRange:[this.state.containerWidth,0]
                                            })
                                        },
                                        this.props.style
                                    ]
                                }
                            >{ text }</Animated.Text>
                        </Fragment>
                    )
                }
            </View>
        );
    }

    startAnimate() {
        this.animateToEnd();
    }

    animateToEnd() {
        Animated.timing(this.transformX,{
            toValue:1,
            duration:this.props.time,
            easing:Easing.linear,
        }).start(() => {
            this.animateToStart()
        });
    }

    animateToStart() {
        Animated.timing(this.transformX,{
            toValue:0,
            duration:0
        }).start(() => {
            this.animateToEnd()
        })
    }

    getElementWidth(element) {
        return new Promise((resolve) => {
            setTimeout(() => {
                element.measure((ox, oy, width) => {
                    resolve(width);
                });
            })
        });
    }

    componentDidUpdate(preProps, preState) {
        if(this.props.text !== preProps.text){
            this.getElementWidth(this.container.getNode()).then((container) => {
                this.setState({
                    containerWidth:container
                })
            });
        }

        if(this.state.contentWidth !== undefined && preState.contentWidth === undefined) {
            this.getElementWidth(this.container.getNode()).then((container) => {
                this.setState({
                    containerWidth:container
                },() => {
                    this.startAnimate();
                })
            });
        }
    }
}

JRNMarquee.defaultProps = {
    time:4000,
    text:''
};

JRNMarquee.propTypes = {
    time:propTypes.number,
    text:propTypes.string,
    style:Text.propTypes.style
};