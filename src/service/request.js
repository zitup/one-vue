import fetch from "../config/fetch";

export default {
    //获取最新onelist
    getOnelist: () => {
        return fetch("/channel/one/0/beijing", "GET")
            .then(res => {
                return res.json();
            })
    },
    //获取图片导航两个月数据
    getLTMdata: ltm => {
        return Promise.all(ltm.map(i => {
            return fetch('/feeds/list/' + i, 'GET')
                .then(res => {
                    return res.json()
                })
        }))
    },
    //获取上个月导航数据
    getLMData: (lastYear, lastMonth) => {
        return fetch('/feeds/list/' + lastYear + '-' + lastMonth, 'GET')
            .then(res => {
                return res.json()
            })
    },
    //获取某一天onelist
    getSomeoneList: date => {
        return fetch('/channel/one/' + date + '/0', 'GET')
            .then(res => {
                return res.json()
            })
    },
    //获取阅读内容及评论
    getEssay: item_id => {
        return Promise.all([fetch("/essay/" + item_id).then(
            res => {
                return res.json();
            }
        ), fetch("/comment/praiseandtime/essay/" + item_id + "/0").then(
            res => {
                return res.json();
            }
        )]);
    },
    //获取更多评论getMoreComment（基于上次评论最后一个评论ID）
    getMC: (item_id, comment_id) => {
        return fetch('/comment/praiseandtime/essay/' + item_id + '/' + comment_id, 'GET')
            .then(res => {
                return res.json();
            })
    }
};
