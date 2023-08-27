
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

export const CustomImageList = ({ data }) => {
    const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'))
    const cols = isLgScreen ? 2 : 3;
    return (
        <ImageList cols={cols} sx={{ p: 2, ml: '15%' }} >
            {data.map((item) => (
                <ImageListItem key={item.img} sx={{ m: 2, width: '95%' }}>
                    <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        sx={{ m: 2 }}
                    />
                    <Link key={item.value} to={`/${item.value.toLowerCase()}`}>
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


