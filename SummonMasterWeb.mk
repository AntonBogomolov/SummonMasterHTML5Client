##
## Auto Generated makefile by CodeLite IDE
## any manual changes will be erased      
##
## Release
ProjectName            :=SummonMasterWeb
ConfigurationName      :=Release
WorkspacePath          :="/home/anton/Рабочий стол/projects/LifeBased/LifeSystem"
ProjectPath            :="/home/anton/Рабочий стол/projects/SummonMasterWeb"
IntermediateDirectory  :=./Release
OutDir                 := $(IntermediateDirectory)
CurrentFileName        :=
CurrentFilePath        :=
CurrentFileFullPath    :=
User                   :=Anton
Date                   :=11/01/18
CodeLitePath           :=/home/anton/.codelite
LinkerName             :=/usr/bin/g++
SharedObjectLinkerName :=/usr/bin/g++ -shared -fPIC
ObjectSuffix           :=.o
DependSuffix           :=.o.d
PreprocessSuffix       :=.i
DebugSwitch            :=-g 
IncludeSwitch          :=-I
LibrarySwitch          :=-l
OutputSwitch           :=-o 
LibraryPathSwitch      :=-L
PreprocessorSwitch     :=-D
SourceSwitch           :=-c 
OutputFile             :=./bin/Release/$(ProjectName)
Preprocessors          :=$(PreprocessorSwitch)NDEBUG 
ObjectSwitch           :=-o 
ArchiveOutputSwitch    := 
PreprocessOnlySwitch   :=-E
ObjectsFileList        :="SummonMasterWeb.txt"
PCHCompileFlags        :=
MakeDirCommand         :=mkdir -p
LinkOptions            :=  
IncludePath            :=  $(IncludeSwitch). $(IncludeSwitch). 
IncludePCH             := 
RcIncludePath          := 
Libs                   := $(LibrarySwitch)november $(LibrarySwitch)curl $(LibrarySwitch)pthread $(LibrarySwitch)z 
ArLibs                 :=  "november" "curl" "pthread" "z" 
LibPath                := $(LibraryPathSwitch). 

##
## Common variables
## AR, CXX, CC, AS, CXXFLAGS and CFLAGS can be overriden using an environment variables
##
AR       := /usr/bin/ar rcu
CXX      := /usr/bin/g++
CC       := /usr/bin/gcc
CXXFLAGS :=  -O2 -pedantic -std=c++14 -Wall $(Preprocessors)
CFLAGS   :=  -O2 -Wall $(Preprocessors)
ASFLAGS  := 
AS       := /usr/bin/as


##
## User defined environment variables
##
CodeLiteDir:=/usr/share/codelite
Objects0=$(IntermediateDirectory)/src_main.cpp$(ObjectSuffix) $(IntermediateDirectory)/src_App_cindexpage.cpp$(ObjectSuffix) $(IntermediateDirectory)/src_App_csitepage.cpp$(ObjectSuffix) $(IntermediateDirectory)/src_App_csuccesspage.cpp$(ObjectSuffix) $(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(ObjectSuffix) $(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(ObjectSuffix) 



Objects=$(Objects0) 

##
## Main Build Targets 
##
.PHONY: all clean PreBuild PrePreBuild PostBuild MakeIntermediateDirs
all: $(OutputFile)

$(OutputFile): $(IntermediateDirectory)/.d $(Objects) 
	@$(MakeDirCommand) $(@D)
	@echo "" > $(IntermediateDirectory)/.d
	@echo $(Objects0)  > $(ObjectsFileList)
	$(LinkerName) $(OutputSwitch)$(OutputFile) @$(ObjectsFileList) $(LibPath) $(Libs) $(LinkOptions)

MakeIntermediateDirs:
	@test -d ./Release || $(MakeDirCommand) ./Release


$(IntermediateDirectory)/.d:
	@test -d ./Release || $(MakeDirCommand) ./Release

PreBuild:


##
## Objects
##
$(IntermediateDirectory)/src_main.cpp$(ObjectSuffix): src/main.cpp $(IntermediateDirectory)/src_main.cpp$(DependSuffix)
	$(CXX) $(IncludePCH) $(SourceSwitch) "/home/anton/Рабочий стол/projects/SummonMasterWeb/src/main.cpp" $(CXXFLAGS) $(ObjectSwitch)$(IntermediateDirectory)/src_main.cpp$(ObjectSuffix) $(IncludePath)
$(IntermediateDirectory)/src_main.cpp$(DependSuffix): src/main.cpp
	@$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) -MG -MP -MT$(IntermediateDirectory)/src_main.cpp$(ObjectSuffix) -MF$(IntermediateDirectory)/src_main.cpp$(DependSuffix) -MM src/main.cpp

$(IntermediateDirectory)/src_main.cpp$(PreprocessSuffix): src/main.cpp
	$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) $(PreprocessOnlySwitch) $(OutputSwitch) $(IntermediateDirectory)/src_main.cpp$(PreprocessSuffix) src/main.cpp

$(IntermediateDirectory)/src_App_cindexpage.cpp$(ObjectSuffix): src/App/cindexpage.cpp $(IntermediateDirectory)/src_App_cindexpage.cpp$(DependSuffix)
	$(CXX) $(IncludePCH) $(SourceSwitch) "/home/anton/Рабочий стол/projects/SummonMasterWeb/src/App/cindexpage.cpp" $(CXXFLAGS) $(ObjectSwitch)$(IntermediateDirectory)/src_App_cindexpage.cpp$(ObjectSuffix) $(IncludePath)
$(IntermediateDirectory)/src_App_cindexpage.cpp$(DependSuffix): src/App/cindexpage.cpp
	@$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) -MG -MP -MT$(IntermediateDirectory)/src_App_cindexpage.cpp$(ObjectSuffix) -MF$(IntermediateDirectory)/src_App_cindexpage.cpp$(DependSuffix) -MM src/App/cindexpage.cpp

$(IntermediateDirectory)/src_App_cindexpage.cpp$(PreprocessSuffix): src/App/cindexpage.cpp
	$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) $(PreprocessOnlySwitch) $(OutputSwitch) $(IntermediateDirectory)/src_App_cindexpage.cpp$(PreprocessSuffix) src/App/cindexpage.cpp

$(IntermediateDirectory)/src_App_csitepage.cpp$(ObjectSuffix): src/App/csitepage.cpp $(IntermediateDirectory)/src_App_csitepage.cpp$(DependSuffix)
	$(CXX) $(IncludePCH) $(SourceSwitch) "/home/anton/Рабочий стол/projects/SummonMasterWeb/src/App/csitepage.cpp" $(CXXFLAGS) $(ObjectSwitch)$(IntermediateDirectory)/src_App_csitepage.cpp$(ObjectSuffix) $(IncludePath)
$(IntermediateDirectory)/src_App_csitepage.cpp$(DependSuffix): src/App/csitepage.cpp
	@$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) -MG -MP -MT$(IntermediateDirectory)/src_App_csitepage.cpp$(ObjectSuffix) -MF$(IntermediateDirectory)/src_App_csitepage.cpp$(DependSuffix) -MM src/App/csitepage.cpp

$(IntermediateDirectory)/src_App_csitepage.cpp$(PreprocessSuffix): src/App/csitepage.cpp
	$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) $(PreprocessOnlySwitch) $(OutputSwitch) $(IntermediateDirectory)/src_App_csitepage.cpp$(PreprocessSuffix) src/App/csitepage.cpp

$(IntermediateDirectory)/src_App_csuccesspage.cpp$(ObjectSuffix): src/App/csuccesspage.cpp $(IntermediateDirectory)/src_App_csuccesspage.cpp$(DependSuffix)
	$(CXX) $(IncludePCH) $(SourceSwitch) "/home/anton/Рабочий стол/projects/SummonMasterWeb/src/App/csuccesspage.cpp" $(CXXFLAGS) $(ObjectSwitch)$(IntermediateDirectory)/src_App_csuccesspage.cpp$(ObjectSuffix) $(IncludePath)
$(IntermediateDirectory)/src_App_csuccesspage.cpp$(DependSuffix): src/App/csuccesspage.cpp
	@$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) -MG -MP -MT$(IntermediateDirectory)/src_App_csuccesspage.cpp$(ObjectSuffix) -MF$(IntermediateDirectory)/src_App_csuccesspage.cpp$(DependSuffix) -MM src/App/csuccesspage.cpp

$(IntermediateDirectory)/src_App_csuccesspage.cpp$(PreprocessSuffix): src/App/csuccesspage.cpp
	$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) $(PreprocessOnlySwitch) $(OutputSwitch) $(IntermediateDirectory)/src_App_csuccesspage.cpp$(PreprocessSuffix) src/App/csuccesspage.cpp

$(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(ObjectSuffix): src/App/CSummonMasterApp.cpp $(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(DependSuffix)
	$(CXX) $(IncludePCH) $(SourceSwitch) "/home/anton/Рабочий стол/projects/SummonMasterWeb/src/App/CSummonMasterApp.cpp" $(CXXFLAGS) $(ObjectSwitch)$(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(ObjectSuffix) $(IncludePath)
$(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(DependSuffix): src/App/CSummonMasterApp.cpp
	@$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) -MG -MP -MT$(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(ObjectSuffix) -MF$(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(DependSuffix) -MM src/App/CSummonMasterApp.cpp

$(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(PreprocessSuffix): src/App/CSummonMasterApp.cpp
	$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) $(PreprocessOnlySwitch) $(OutputSwitch) $(IntermediateDirectory)/src_App_CSummonMasterApp.cpp$(PreprocessSuffix) src/App/CSummonMasterApp.cpp

$(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(ObjectSuffix): src/App/CSummonMasterCommandManager.cpp $(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(DependSuffix)
	$(CXX) $(IncludePCH) $(SourceSwitch) "/home/anton/Рабочий стол/projects/SummonMasterWeb/src/App/CSummonMasterCommandManager.cpp" $(CXXFLAGS) $(ObjectSwitch)$(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(ObjectSuffix) $(IncludePath)
$(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(DependSuffix): src/App/CSummonMasterCommandManager.cpp
	@$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) -MG -MP -MT$(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(ObjectSuffix) -MF$(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(DependSuffix) -MM src/App/CSummonMasterCommandManager.cpp

$(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(PreprocessSuffix): src/App/CSummonMasterCommandManager.cpp
	$(CXX) $(CXXFLAGS) $(IncludePCH) $(IncludePath) $(PreprocessOnlySwitch) $(OutputSwitch) $(IntermediateDirectory)/src_App_CSummonMasterCommandManager.cpp$(PreprocessSuffix) src/App/CSummonMasterCommandManager.cpp


-include $(IntermediateDirectory)/*$(DependSuffix)
##
## Clean
##
clean:
	$(RM) -r ./Release/


