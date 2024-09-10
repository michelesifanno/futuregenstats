export default function PlayerComponent ({ id, width, height }) {

    
    const imageUrl = `https://res.cloudinary.com/dfe8fzdna/image/upload/${id}/${id}.png`;

    return (
            <img
                src={imageUrl}
                alt={'Player Image'}
                style={{
                    width: width,
                    height: height,
                    borderRadius: '100%',
                    objectFit: 'cover'
                }}
            />
    );
};