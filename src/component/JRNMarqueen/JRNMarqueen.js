import React,{ Component } from 'react';
import {View, Animated, Text, Easing} from "react-native";

export class JRNMarquee extends Component{
    transformX= new Animated.Value(0);

    constructor(props) {
        super(props);
    }

    render() {
        let { text } = this.props;
        return (
            <View style={{ backgroundColor:'red', flexDirection:'row', overflow:'hidden' }}>
                <Animated.View
                    style={{transform:[{ translateX:this.transformX }], width:'100%' }}>
                    <View ref={(container) => this.container = container} style={{ backgroundColor:'transparent' }}>
                        <Text>{ text }</Text>
                    </View>
                </Animated.View>
                <Animated.View  style={{ transform:[{ translateX:this.transformX}], width:'100%' }}>
                    <View style={{ backgroundColor:'transparent' }}>
                        <Text>{ text }</Text>
                    </View>
                </Animated.View>
            </View>
        );
    }

    startAnimate(container) {
        this.animateToEnd(container);
    }


    animateToEnd(container) {
        Animated.timing(this.transformX,{
            toValue:-container,
            duration:4000,
            easing:Easing.linear,
            useNativeDriver:true
        }).start(() => {
            this.animateToStart(container)
        });
        this.flag = true;
    }

    animateToStart(container) {
        Animated.timing(this.transformX,{
            toValue:0,
            duration:0,
            useNativeDriver:true
        }).start(() => {
            this.animateToEnd(container)
        })
    }


    componentDidMount() {
        this.getWidth().then(([ container]) => {
            this.startAnimate(container);
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

    getWidth() {
        return Promise.all([this.getElementWidth(this.container)]);
    }
}