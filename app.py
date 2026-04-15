import streamlit as st
from gemini import generate_response_issues, generate_response_solution

st.title("AI Code Debugger")
st.markdown("Upload your code file and let the AI help you debug it!")
st.divider()

with st.sidebar:
    st.header("control panel")
    uploaded_file = st.file_uploader("Choose a code file", type=["png", "jpg", "jpeg"],accept_multiple_files=True)
    if uploaded_file:
        if len(uploaded_file) > 3:
            st.error("You can upload a maximum of 3 files.")
        else:
            col=st.columns(len(uploaded_file))
            for i, file in enumerate(uploaded_file):
                with col[i]:st.image(file)

    option = st.selectbox("Select the Option", ["Hint", "Solution of Code"],index=None)

    pressed=st.button("Debug Code",type="primary")


if pressed:
    if not uploaded_file:
        st.error("Please upload a image file before debugging.")
    if not option:
        st.error("Please select an option before debugging.")

    if uploaded_file and option:
        with st.container(border=True):
            st.subheader("The Issues in your code",anchor=False)
            with st.spinner("Analyzing the code..."):
                response_issues = generate_response_issues(uploaded_file)
                st.markdown(response_issues)

        with st.container(border=True):
            if option == "Hint":
                st.subheader("Hints to fix the issues in your code")
                with st.spinner("Generating hints..."):
                    response_solution = generate_response_solution(uploaded_file, option)
                    st.markdown(response_solution)
            else:
                st.subheader("The solution in your code")
                with st.spinner("Generating solution..."):
                    response_solution = generate_response_solution(uploaded_file, option)
                    st.markdown(response_solution)





