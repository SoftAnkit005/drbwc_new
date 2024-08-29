import React from 'react'
import social_media from "../../../data/social-media/social-media.json";

const FooterSocialMedia = () => {
  return (
    <>
        <ul className="list-unstyled mb-4 p-0 d-flex gap-2 flex-wrap">
            {social_media && (
                social_media.map((item, key) => (
                    <li key={key}>
                        <a href={item.link} target="_blank" >
                            <img height={26} src={item.src} alt={item.name} />
                        </a>
                    </li>
                ))
            )}
        </ul>
    </>
  )
}

export default FooterSocialMedia