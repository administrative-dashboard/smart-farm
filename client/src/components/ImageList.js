
//components/ImageList.js
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link } from 'react-router-dom';

export const CustomImageList = ({ data, detail }) => {
    const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'))
    return (
        <ImageList cols={isLgScreen ? 2 : 3} sx={{ backgroundColor: 'rgba(245, 246, 241, 0.8)', borderRadius: '15%', p: 2, ml: '15%' }} >
            {data.map((item) => (
                <ImageListItem key={item.img} sx={{ m: 2, width: '85%' }}>
                    <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        sx={{ m: 2 }}
                    />
                    <Link key={item.title} to={`/${detail}/${item.title.toLowerCase()}`}>
                        <ImageListItemBar
                            title={item.title}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                >
                                    <small>
                                        Add
                                    </small>
                                    <PostAddIcon sx={{ mx: 2 }} />
                                </IconButton >
                            }
                        />
                    </Link>
                </ImageListItem>
            ))}
        </ImageList>
    )
}


