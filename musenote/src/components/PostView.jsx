import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import Logo from './Logo';
import './PostView.css';
import logo from '../assets/logo.png';
import { IoIosContact } from "react-icons/io";

const PostView = () => {
  const { postId } = useParams();

  // Mock data - replace with real fetch later
  const post = {
    title: 'Sample Post Title',
    content: `Aasa paasam bandee sesene Saaage kaalam aade aatele Teeraa \n teeram serelogaane Ye teerouno Seruvaina sedu dooraale Todoutune eede vainaale
Needo kaado telelogaane yedetouno
Aatu potu gunde maatullona saagenaa
Yelelelelo kallolam ee lokamlo
Lolo lo lotullo ye leelo
Eda kolanullo
Nindu punnamela mabbu kammukochhi
Simma seekatalli potunte
Nee gamyam gandaragolam
Dikku tochakunda talladilli potu
Pallatilli poyi neevunte
Teerenaa nee aaraatam
Ye hetuvu nuditi raatalni
Maarchindo nisitangaa telisedelaa
Repetouno telaalante
Nee uniki undaaligaa
Oo aatu potu gunde maatullona
Saagenaaa
Aasa paasam bandee sesele
Saage kaalam aade taatele
Teeraa teeram serelogaane ye teerouno
Ye jaadalo yemunnado
Kreeneedalaa vidhi vechnnado
Ye malupulo yem daagunnado
Neevugaa telchuko nee saililo
Siggu mullu gappi ranguleenutunna
Lokamante pedda naatakame
Teliyakane saage kadhanam
Neevu pettukunna nammakaalu anni
Pakka daari patti potunte
Kanchiki nee kathale dooram
Nee setullo undi setallo supinchi
Eduregi saagaaliga
Repetouno telaalante nuveduru sudaaligaa
Oo aatu potu gunde maatullona
Untunnaa
Reraa naane naane naanenaa
Reraa naane naane naanenaa
Taara taara taareraarere taaraaraa
Reraa naane naane naanenaa
Reraa naane naane naanenaa
Taara taara taareraarere taaraaraa`,
    username: 'lyric_master',
    likes: 42,
    genre: 'Pop',
    tag1: '#love',
    tag2: '#dreams',
  };

  return (
    <div>
      {/* Header Section */}
      <div className="top-bar-postview">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img-home" />
        </div>
        <div className="back-home">
          <Link to="/home" className="home-link">
            <FaArrowLeft className="home-icon" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="post-view">
        <div className = "first-black">
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span className="username"><IoIosContact />Posted by: @{post.username}</span>
            <span className="likes">
              <FaHeart className="heart-icon" /> {post.likes} likes
            </span>
          </div>
        
          <div className="post-tags">
            <span>{post.genre}</span> <span>{post.tag1}</span> <span>{post.tag2}</span>
          </div>
        </div>

        <div className="post-body">
          <div className = "lyric">
            {post.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
  </div>
</div>

    </div>
  );
};

export default PostView;
