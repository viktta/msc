import axios from 'axios';

function Post(){
    axios({
        metho: 'post',
        url: 'https://api.spotify.com/v1/users/aleoria2002/playlists',
        data: {
            userid: 'aleoria2002',
            public: false,
        },
        Authorization: "BQD4-xaWUb0ceoqqoV-lBb_yj9c0qst4O927cG70hzjJC8uP24ZSx1q_NAl4ey_SFGqVhssaDVq84EoEOoBqs1RDEa9nK-PIQoMU65B_PGlhyfHAiC64nrOMD72mm9X4R0enBc9eoCvS-Os8k5zoMzvLVVAWG1famyEQQmkBKLyd",
    })
} 


export default Post; 