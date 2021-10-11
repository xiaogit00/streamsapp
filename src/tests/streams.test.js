//Main logic for the Test

// I'll need to make a dispatch(deleteStream(id)) call.
// If successful, the stream will be deleted.

// This test checks for a couple of things.
// -First, that my reducer is ok.
// -Second, that my action creator is okay.
// -Third, that my axios service is okay.
// -Fourth, that my delete API is okay.

// Implementation

// 1. Test whether you could get the state of the store from within test environment.
// 2. import useDispatch, import reducer. Let's just try
import { useDispatch } from 'react-redux'
import { deleteStream } from 'reducers/streamreducer'
import StreamMenuBar from 'components/streamBar/streamMenuBar'

describe('test suite', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })

    it('does something', () => {
        // ARRANGE
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)  /* SANITY CHECK */
        expect(dummyDispatch).not.toHaveBeenCalled()    /* RENDER COMPONENT AND ASSERT HERE */})
})
//
// test('Deleting Streams works from UI', () => {
//     const wrapper = mount(<StreamMenuBar />)
//     dispatch(deleteStream('614b2acbcc94e92506c2d108'))
//     // at this point, I should invoke deleteStream action creator.
//     // This actioncreator will help me create the following action:
//
//
//     //In addition, because I've used async dispatch, I will also be sending an
//     // axios delete request to the URI.
//     // What I expect is for the data in the streams to be deleted.
//     // this will be the first thing. The second thing is that I expect store
//     // to be updated. But because store is empty, the returned state will
//     // be empty.
//
// })
