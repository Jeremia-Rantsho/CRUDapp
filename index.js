import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(cors());

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
