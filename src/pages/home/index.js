import * as React from 'react';
// import ReactDOM from 'react-dom'
// import { Link } from 'react-router-dom'
import {Toast, Carousel} from 'antd-mobile'
import connect from 'utils/connect'
import SongItemList from 'components/SongItemList'
// import SongItemListBox from 'components/SongItemListBox'
import './index.scss'


@connect('', 'homeReducer', 'getBanner')
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            val: '',
            focusInp: false,
        }
    }


    componentDidMount() {
        Toast.loading('加载中...')
        this.props.actions.getBanner().then((resp) => {
            // console.log('resp', resp)
            Toast.hide()
        })
    }

    onChangeInp = (event) => {
        let val = event.target.value.trim()
        this.setState({
            val,
        })

    }

    render() {
        const { val } = this.state
        let { homeReducer } = this.props
        let banner = homeReducer.bannerList
        return(
            <div className="home">
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    dotActiveStyle={{
                        background: '#e40077',
                    }}
                >
                    {banner.map( item => (
                        <a
                        key={item}
                        href={item.linkData.linkUrl}
                        >
                        <img
                            src={item.linkData.linkPicUrl}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            }}
                        />
                        </a>
                    ))}
                </Carousel>
                <div className="index-search">
                    <input
                        type="text"
                        onChange={this.onChangeInp}
                        ref={(e) => this.inpRef = e}
                        value={val}
                        />
                    {val ? null : <div className="search-prompt" onClick={() => this.inpRef.focus()}>
                        <img alt="" className="prompt-img" src="http://mcontent.10086.cn/web/fs/media/p/154/353/11161/image/20180627/1341438.png" />
                        <span className="prompt-text">搜索</span>
                    </div>}
                </div>
                {banner.length > 0 && <SongItemList title="推荐歌单" />}
            </div>
        )
    }
}
export default Home
