let projectTypes = document.querySelectorAll('.project-type');
let devProjects = document.querySelector('.dev-projects');
let vidProjects = document.querySelector('.vid-projects');


projectTypes.forEach(function(project){
    
    project.addEventListener("click", ()=>{
        projectTypes.forEach(function(projects){
            projects.classList.remove('selected-project-type')
            projects.classList.remove('active');
            
        })
        project.classList.add('selected-project-type');
        project.classList.add('active');
        if(project.id == 'video'){
            devProjects.style.display = 'none';
            vidProjects.style.display = 'flex';
        }
        else if(project.id == 'dev'){
            devProjects.style.display = 'flex';
            vidProjects.style.display = 'none';
        }

        
    })
});
