import {
	Box,
	Divider,
	Flex,
	FormControl,
	Grid,
	Input,
	Select,
	Spinner,
	useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AllCoursesCard } from 'src/components';
import SectionTitle from 'src/components/section-title/section-title';
import { coursesFilter } from 'src/config/constants';
import {
	FilterCourseType,
	FilterItemProps,
} from './courses-page-component.props';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { CourseType } from 'src/interfaces/course.interface';
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { AppService } from 'src/services/app.service';

const CoursesPageComponent = () => {
	const [filter, setFilter] = useState<FilterCourseType>({
		id: '',
		category: '',
	});
	const [searchValue, setSearchValue] = useState<string>('');
	const [allCourses, setAllCourses] = useState<CourseType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { t } = useTranslation();
	const { courses } = useTypedSelector(state => state.course);

	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		setAllCourses(
			courses.filter(
				c => c.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
			)
		);
	};

	useEffect(() => {
		setAllCourses(courses);

		const getCoursesByLng = async (lng: string) => {
			setIsLoading(true);
			return await AppService.getCourses(lng);
		};

		if (filter.id == 'category') {
			setAllCourses(courses.filter(c => c.category == filter.category));
		} else if (filter.id == 'rating') {
			setAllCourses(courses.filter(c => c.reviewAvg >= Number(filter.category)));
		} else if (filter.id == 'level') {
			setAllCourses(courses.filter(c => c.level == filter.category));
		} else if (filter.id == 'language') {
			getCoursesByLng(filter.category).then(res => {
				setIsLoading(false);
				setAllCourses(res);
			});
		}
	}, [courses, filter]);

	return (
		<>
			<SectionTitle
				title={t('title', { ns: 'courses' })}
				subtitle={t('description', { ns: 'courses' })}
			/>
			<Box pos={'relative'} mt={5}>
				<Input
					h={14}
					w={'full'}
					bg={'white'}
					color={'gray.900'}
					placeholder={t('search_input_placeholder', { ns: 'courses' }) || ''}
					_placeholder={{ color: 'gray.500' }}
					value={searchValue}
					onChange={searchHandler}
				/>
			</Box>
			<Flex mt={5} gap={5} direction={{ base: 'column', lg: 'column' }}>
				<Divider mt={5} />
				<Flex
					w={'100%'}
					gap={4}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					justifyContent={'space-between'}
				>
					{coursesFilter.map(item => (
						<FilterItem item={item} key={item.id} setFilter={setFilter} />
					))}
				</Flex>
				<Box w='100%'>
					{isLoading ? (
						<Flex h={'60vh'} justify={'center'} align={'center'}>
							<Spinner />
						</Flex>
					) : (
						<>
							<Grid
								mt={5}
								gridTemplateColumns={{
									base: '1fr',
									md: '1fr 1fr',
									lg: '1fr 1fr 1fr',
								}}
								gap={5}
							>
								{allCourses.map(item => (
									<AllCoursesCard key={item.title} course={item} />
								))}
							</Grid>
						</>
					)}
				</Box>
			</Flex>
		</>
	);
};
export default CoursesPageComponent;

const FilterItem = ({
	item,
	setFilter,
}: {
	item: FilterItemProps
	setFilter: Dispatch<SetStateAction<FilterCourseType>>
}) => {
	const { t } = useTranslation();

	const handleChange = (category: string, id: string) => {
		setFilter({ category, id });
	};

	const renderFilterItem = () => (
		<>
			<Select
				borderRadius={'8px'}
				placeholder={`${t(item.title, { ns: 'courses' })}`}
				height={14}
				focusBorderColor={'facebook.500'}
			>
				{item.categoryList.map(c => (
					<option
						key={c.id}
						value={c.name}
						onClick={() => handleChange(c.id, item.id)}
					>
						{t(c.name, { ns: 'courses' })}
					</option>
				))}
			</Select>
		</>
	);

	return (
		<FormControl isRequired mt={15} key={item.id}>
			{renderFilterItem()}
		</FormControl>
	);
};
