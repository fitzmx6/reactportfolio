import React from 'react';
import portfolioData from '../data/data.json';

// Detail Page Component
export default class DetailItemContent extends React.Component {
    render() {
        const path = this.props.location.pathname;
        const category = path.split('/')[1];
        const objectNum = portfolioData[category].findIndex(item => item.url === path);
        const detailItem = portfolioData[category][objectNum];
        const content = detailItem.subContent;
        let subContentLink;
        let subContentDesc;
        let subContentVideo;

        if (detailItem.link) {
            subContentLink = <a href={content.link} target="_blank" rel="noopener noreferrer">{content.link}</a>;
        }

        if (detailItem.desc) {
            subContentDesc = <p>{detailItem.desc}</p>;
        }

        if (detailItem.videoLink) {
            subContentVideo = <video preload controls>      
                 <source src={`/video/${detailItem.videoLink}.webm`} type='video/webm; codecs="vp8, vorbis"' /> 
                 <source src={`/video/${detailItem.videoLink}.theora.ogv`} type='video/ogg; codecs="theora, vorbis"' /> 
                 <source src={`/video/${detailItem.videoLink}.mp4`} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                 This web browser does not support HTML5. Upgrade or view the video at <a href="{detailItem.youtubeLink}" title="youtube redirect">{detailItem.youtubeLink}</a>     
            </video>;
        }

        return (
            <div id="sub-content">
                <div className="grid-d-12">
                    <h2>{detailItem.name}</h2>

                    {content.images.map(image => (
                        <img key={image} src={image} alt="" />
                    ))}

                    {subContentVideo}
                    {subContentDesc}
                    {subContentLink}                  
                </div>
            </div>
        );
    }
}

