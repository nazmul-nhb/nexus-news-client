import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import { useEffect } from 'react';
import { MdImage, MdViewHeadline } from 'react-icons/md';
import { FaNewspaper, FaRegNewspaper, FaSackDollar } from 'react-icons/fa6';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { TiNews } from 'react-icons/ti';
import Select from 'react-select';

const animatedComponents = makeAnimated();

const customStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'transparent',
        boxShadow: state.isFocused ? 'none' : 'none',
        border: 'none',
        padding: '0 0 0 4px',
    }),
    container: (base) => ({
        ...base,
        padding: '0 0 0 4px',
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 0 0 4px',
    }),
    menu: (base) => ({
        ...base,
        // backgroundColor: 'transparent',
        padding: '0 0 0 4px',
    }),
    multiValue: (base) => ({
        ...base,
        // backgroundColor: 'transparent',
    }),
    multiValueLabel: (base) => ({
        ...base,
        // color: '#000',
    }),
    multiValueRemove: (base) => ({
        ...base,
        // color: '#000',
        ':hover': {
            backgroundColor: 'transparent',
            // color: '#000',
        },
    }),
    input: (base) => ({
        ...base,
        margin: '0',
        padding: '0 0 0 4px',
    }),
    placeholder: (base) => ({
        ...base,
        // color: '#aaa',
    }),
    options: (base, state) => ({
        ...base,
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: state.isFocused ? '#f0f0f0' : 'transparent', // Example hover color
            color: state.isFocused ? '#fff' : '#fff', // Example hover text color
        },
    })
};

const ArticleForm = ({
    // addArticle,
    // updateArticle,
    imageUploading,
    imageFileName,
    setImageFileName,
    setResetForm,
    handlePostArticle,
    setNewsTags,
    setNewsType,
    setPublisher }) => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: publishers = [] } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosPublic('/publishers')
            return res.data;
        }
    });

    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic('/tags')
            return res.data;
        }
    });

    // console.log(tags);

    useEffect(() => {
        if (setResetForm) {
            setResetForm(reset);
        }
    }, [reset, setResetForm]);

    // const newsTheme = (theme) => {
    //     return {
    //         ...theme,
    //         colors: {
    //             ...theme.colors,
    //             primary25: 'blue',
    //             primary: 'orange',
    //         },
    //     }
    // }

    return (
        <div className='my-6'>
            <form onSubmit={handleSubmit(handlePostArticle)} className='mx-auto grid grid-cols-9 gap-3 font-medium'>
                {/* Headline/Title */}
                <div className="col-span-9 lg:col-span-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-primary">
                        <MdViewHeadline />
                        <label className="font-medium" htmlFor="headline">Headline</label>
                        <input
                            {...register("headline", {
                                required: { value: true, message: "You must write a headline!" },
                            })}
                            className="px-2 rounded-r-lg py-[7px] bg-transparent w-full border-l border-nexus-primary focus:outline-0" type="text" name="headline" id="headline" placeholder="Headline for the Article" />
                    </div>
                    {
                        errors.headline && <p className="text-red-700">{errors.headline.message}</p>
                    }
                </div>
                {/* Type */}
                <div className="col-span-9 lg:col-span-2 flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-primary">
                        <FaSackDollar />
                        <label className="font-medium" htmlFor="type">Type</label>
                        <Select isClearable
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={setNewsType}
                            options={[{ value: true, label: 'Premium' }, { value: false, label: 'Free' }]}
                            required
                            placeholder="Article Type"
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-primary focus:outline-0" id='type' name='type'
                        />
                    </div>
                </div>
                {/* Publisher */}
                <div className="col-span-9 lg:col-span-3 flex flex-col gap-3">
                    <div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-nexus-primary">
                        <FaNewspaper />
                        <label className="font-medium" htmlFor="publisher">Publisher</label>
                        <Select isClearable
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={setPublisher}
                            options={publishers.map(publisher => ({
                                value: publisher.publisher,
                                label: publisher.publisher
                            }))}
                            required
                            placeholder="Select Publisher"
                            className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-primary focus:outline-0" id='publisher' name='publisher'
                        />
                    </div>
                </div>
                {/* Image */}
                <div className="col-span-9 lg:col-span-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 bg-transparent pl-2 py-[7px] rounded-lg border border-nexus-primary">
                        <MdImage />
                        <label className="font-medium" htmlFor="image">Image</label>
                        <div className="w-full">
                            <div className="relative w-full">
                                <input
                                    {...register("image", {
                                        required:
                                            { value: true, message: "Provide an image file!" }
                                    })}
                                    className="absolute w-full h-full opacity-0 cursor-pointer bg-transparent focus:outline-0"
                                    type="file" name="image" id="image"
                                    accept="image/jpeg, image/bmp, image/png, image/gif"
                                    onChange={(e) => setImageFileName(e.target.files[0]?.name || "Upload News Image")}
                                />
                                <label htmlFor="image" className="px-2 rounded-r-lg py-2 bg-transparent w-full border-l border-nexus-primary focus:outline-0 text-gray-500 hover:bg-gray-500 hover:text-white transition-all duration-500 block overflow-hidden whitespace-nowrap overflow-ellipsis absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer">
                                    {imageFileName}
                                </label>
                            </div>
                        </div>
                    </div>
                    {
                        errors.image && <p className="text-red-700">{errors.image.message}</p>
                    }
                </div>
                {/* Tags */}
                <div className="col-span-9 lg:col-span-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-nexus-primary">
                        <FaRegNewspaper />
                        <label className="font-medium" htmlFor="tags">Tags</label>
                        <CreatableSelect
                            styles={customStyles}
                            isClearable isMulti
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // theme={newsTheme}
                            defaultValue={[]}
                            options={tags}
                            onChange={setNewsTags}
                            required
                            placeholder="Select Tags"
                            className="px-2 rounded-l-none rounded-r-lg py-1 bg-transparent w-full border-l border-nexus-primary focus:outline-0"
                            id='tags' name='tags'
                        />
                    </div>
                </div>
                {/* News Description */}
                <div className="col-span-9 flex flex-col gap-3">
                    <div className="flex md:flex-row flex-col items-start justify-start gap-2 py-0.5 bg-transparent rounded-lg border border-nexus-primary">
                        <div className="pl-2 flex items-center gap-2 pt-1">
                            <TiNews />
                            <label className="font-medium" htmlFor="description">Description</label>
                        </div>
                        <textarea
                            {...register("description", {
                                required: { value: true, message: "You must write News Description!" },
                            })}
                            className="h-80 px-2 rounded-tr-none md:rounded-r-lg py-1 bg-transparent w-full border-t md:border-t-0 md:border-l border-nexus-primary focus:outline-0" type="text" name="description" id="description" placeholder="Description for the Article" />
                    </div>
                    {
                        errors.description && <p className="text-red-700">{errors.description.message}</p>
                    }
                </div>
                <Button buttonType={'submit'} buttonText={imageUploading ? 'Loading...' : 'Post Article'} />
            </form >
        </div >
    );
};

ArticleForm.propTypes = {
    addArticle: PropTypes.bool,
    updateArticle: PropTypes.bool,
    imageUploading: PropTypes.bool,
    handlePostArticle: PropTypes.func,
    setResetForm: PropTypes.func,
    setImageFileName: PropTypes.func,
    setNewsTags: PropTypes.func,
    setNewsType: PropTypes.func,
    setPublisher: PropTypes.func,
    imageFileName: PropTypes.string,
};

export default ArticleForm;